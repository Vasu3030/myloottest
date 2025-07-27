import { Request, Response, NextFunction } from 'express';

export function validateDateRange(req: Request, res: Response, next: NextFunction) {
    const fromParam = req.query.from as string | undefined;
    const toParam = req.query.to as string | undefined;

    // Check if from and to are provided together and return error if not
    if (!fromParam || !toParam) {
        return res.status(400).json({ status: 400, error: 'Both dates must be provided together' });
    }

    const from = new Date(fromParam);
    const to = new Date(toParam);

    // Check if from and to are valid dates
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        return res.status(400).json({ status: 400, error: 'Invalid date format' });
    }

    // Check if from < to
    if (from >= to) {
        return res.status(400).json({ status: 400, error: 'from date must be earlier than to date' });
    }

    // Attach validated dates to the request object for later use
    (req as any).validatedDates = { from, to };

    next();
}
