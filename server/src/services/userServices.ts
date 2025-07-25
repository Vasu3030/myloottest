import prisma from '../utils/prismaClient';
import { IUserWithTeam, IUserWithEarnings, IApiError } from '../type/user';

// Get user infos and his team infos (with id, name, total coins and active users)
async function getUserWithTeam(userId: number): Promise<IUserWithTeam | null> {
  // Récupère l'utilisateur avec son équipe
  const user = await prisma.user.findUnique({
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

  if (!user) return null;

  // Calcule le total des coins pour la team
  const coinsSum = await prisma.coinEarning.aggregate({
    where: { teamId: user.team.id },
    _sum: { amount: true },
  });

  // Compte les utilisateurs actifs dans la team
  const activeUsers = await prisma.user.count({
    where: { teamId: user.team.id, status: true },
  });

  return {
    ...user,
    team: {
      ...user.team,
      totalCoins: coinsSum._sum.amount ?? 0,
      activeUsers,
    },
  };
}

// Get the total coin earnings of a user in a team
async function getUserEarningsSum(userId: number, teamId: number): Promise<number> {
  const result = await prisma.coinEarning.aggregate({
    where: { userId, teamId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

// Get the total coin earnings of a team
async function getTeamEarningsSum(teamId: number): Promise<number> {
  const result = await prisma.coinEarning.aggregate({
    where: { teamId },
    _sum: { amount: true },
  });
  return result._sum.amount ?? 0;
}

// Get user infos with team infos and coin earnings (total and percentage)
export async function fetchUserById(userId: number): Promise<IUserWithEarnings | IApiError> {
  const user = await getUserWithTeam(userId);
  if (!user) return { status: 404, error: 'User not found' };

  const earningsSum = await getUserEarningsSum(userId, user.team.id);
  const teamEarningsSum = await getTeamEarningsSum(user.team.id);

  const percentage =
    teamEarningsSum > 0
      ? Math.round((earningsSum * 100) / teamEarningsSum)
      : 0;

  return {
    ...user,
    earningsSum,
    percentage,
  };
}
