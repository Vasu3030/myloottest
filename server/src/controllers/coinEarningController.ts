import { Request, Response } from 'express';
import { addCoins } from '../services/coinEarningServices';

export async function postCoinsToTeam(req: Request, res: Response) {
  try {
    const { userId, teamId, amount } = req.body;

    // Vérifications des entrées
    if (
      typeof userId !== 'number' ||
      typeof teamId !== 'number' ||
      typeof amount !== 'number'
    ) {
      return res.status(400).json({ status: 400, error: 'userId, teamId et amount doivent être des nombres' });
    }

    if (amount <= 0) {
      return res.status(400).json({ status: 400, error: 'amount doit être supérieur à 0' });
    }

    // Appel du service
    const data = await addCoins(userId, teamId, amount);

    return res.status(data.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, error: 'Internal server error' });
  }
}
