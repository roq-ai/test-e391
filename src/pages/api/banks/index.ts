import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bankValidationSchema } from 'validationSchema/banks';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBanks();
    case 'POST':
      return createBank();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBanks() {
    const data = await prisma.bank
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bank'));
    return res.status(200).json(data);
  }

  async function createBank() {
    await bankValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.credit?.length > 0) {
      const create_credit = body.credit;
      body.credit = {
        create: create_credit,
      };
    } else {
      delete body.credit;
    }
    if (body?.mortgage?.length > 0) {
      const create_mortgage = body.mortgage;
      body.mortgage = {
        create: create_mortgage,
      };
    } else {
      delete body.mortgage;
    }
    const data = await prisma.bank.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
