import { Request, Response, NextFunction } from 'express';

export function validateTeamId(req: Request, res: Response, next: NextFunction) {
    const teamId = Number(req.params.id);

    // Check if teamId is passed properly in params and return error if not
    if (isNaN(teamId)) {
        return res.status(404).json({ status: 404, error: 'Invalid team ID' });
    }

    next();
}
