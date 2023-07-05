import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { mortgageValidationSchema } from 'validationSchema/mortgages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.mortgage
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMortgageById();
    case 'PUT':
      return updateMortgageById();
    case 'DELETE':
      return deleteMortgageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMortgageById() {
    const data = await prisma.mortgage.findFirst(convertQueryToPrismaUtil(req.query, 'mortgage'));
    return res.status(200).json(data);
  }

  async function updateMortgageById() {
    await mortgageValidationSchema.validate(req.body);
    const data = await prisma.mortgage.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMortgageById() {
    const data = await prisma.mortgage.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
