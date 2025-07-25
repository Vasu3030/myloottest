import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

export async function validateTeamId(req: Request, res: Response, next: NextFunction) {
    const teamId = Number(req.params.id);

    // Check if teamId is passed properly in params and return error if not
    if (isNaN(teamId)) {
        return res.status(404).json({ status: 404, error: 'Invalid team ID' });
    }

    const team = await prisma.team.findUnique({
        where: { id: teamId }
    });

    if (!team) {
        return res.status(404).json({ status: 404, error: 'Team not Found' });
    }

    // Attache éventuellement la team trouvée à la requête pour éviter une 2ème requête plus tard
    (req as any).team = team;

    next();
}
