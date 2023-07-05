const mapping: Record<string, string> = {
  banks: 'bank',
  credits: 'credit',
  mortgages: 'mortgage',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
