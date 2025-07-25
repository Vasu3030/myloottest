import { Request, Response, NextFunction } from 'express';

export function validatePagination(req: Request, res: Response, next: NextFunction) {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;

    // Check if page and pageSize are valid numbers and return error if not
    if ((page && isNaN(page)) || (pageSize && isNaN(pageSize))) {
        return res.status(400).json({ status: 400, error: 'Invalid pagination' });
    }

    next();
}
