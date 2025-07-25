import prisma from '../utils/prismaClient'

async function getUserWithTeam(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      pseudo: true,
      status: true,
      team: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function getUserEarningsSum(userId: number, teamId: number) {
  const result = await prisma.coinEarning.aggregate({
    where: { userId, teamId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

async function getTeamEarningsSum(teamId: number) {
  const result = await prisma.coinEarning.aggregate({
    where: { teamId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

export async function fetchUserById(userId: number) {
  const user = await getUserWithTeam(userId);
  if (!user) return { status: 404, error: 'User not found' };

  const earningsSum = await getUserEarningsSum(userId, user.team.id);
  const teamEarningsSum = await getTeamEarningsSum(user.team.id);

  const percentage =
  teamEarningsSum > 0
    ? Math.round(earningsSum * 100 / teamEarningsSum)
    : 0;

  return {
    ...user,
    earningsSum,
    percentage,
  };
}