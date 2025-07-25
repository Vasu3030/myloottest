import { Request, Response } from 'express'
import { fetchTeamsList, fetchTeamStats, fetchTeamById } from '../services/teamServices'

// List all teams with pagination
export async function getTeamsList(req: Request, res: Response) {

    try {

        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);

        // Check if page and pageSize are valid numbers
        if ((page && isNaN(page)) || (pageSize && isNaN(pageSize))) return res.status(400).json({ status: 404, error: 'Invalid pagination' })

        // Call the service to fetch teams list with pagination
        const data = await fetchTeamsList(page, pageSize);

        return res.status(data.status).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}

// Get team infos, name, total coins.
export async function getTeamInfo(req: Request, res: Response) {

    try {
        // Check if teamId is passed properly in params
        const teamId = Number(req.params.id)
        if (isNaN(teamId)) return res.status(404).json({ status: 404, error: 'Invalid team ID' })

        // Call the service to fetch team info
        const data = await fetchTeamById(teamId)

        // If team is not found, return 404
        if (data === null) return res.status(404).json({ status: 404, error: 'Invalid team ID' })

        return res.status(200).json(data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, error: 'Internal server error' })
    }
}

// Get team infos, name, total coins, team info.
export async function getTeamStats(req: Request, res: Response) {

    try {
        // Check if teamId is passed properly in params and return error if not
        const teamId = Number(req.params.id)
        if (isNaN(teamId)) return res.status(404).json({ status: 404, error: 'Invalid team ID' })

        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);

        // Check if page and pageSize are valid numbers and return error if not
        if ((page && isNaN(page)) || (pageSize && isNaN(pageSize))) return res.status(400).json({ status: 404, error: 'Invalid pagination' })

        // Call the service to fetch team stats with pagination
        const data = await fetchTeamStats(teamId, page, pageSize)

        return res.status(data.status).json(data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: 500, error: 'Internal server error' })
    }
}


export async function getTeamLeaderboard(req: Request, res: Response) {
    try {
        // Check if teamId is passed properly in params and return error if not
        const teamId = Number(req.params.id);
        if (isNaN(teamId)) {
            return res.status(404).json({ status: 404, error: 'Invalid team ID' });
        }

        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);

        // Check if page and pageSize are valid numbers and return error if not
        if ((page && isNaN(page)) || (pageSize && isNaN(pageSize))) return res.status(400).json({ status: 404, error: 'Invalid pagination' })

        const fromParam = req.query.from as string | undefined;
        const toParam = req.query.to as string | undefined;
        let from: Date | undefined;
        let to: Date | undefined;

        // Check if from and to are provided together and return error if not
        if (!fromParam || !toParam) {
            return res.status(400).json({ status: 400, error: 'Both dates must be provided together' });
        }

        from = new Date(fromParam);
        to = new Date(toParam);

        // Check if from and to are dates
        if (isNaN(from.getTime()) || isNaN(to.getTime())) {
            return res.status(400).json({ status: 400, error: 'Invalid date format' });
        }

        // Check if from < to
        if (from >= to) {
            return res.status(400).json({ status: 400, error: 'from date must be earlier than to date' });
        }

        // Call the service to fetch team stats with date range and pagination
        const data = await fetchTeamStats(teamId, page, pageSize, from, to);
        
        return res.status(data.status).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal server error' });
    }
}
