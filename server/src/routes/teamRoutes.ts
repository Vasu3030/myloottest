import express from 'express'
import { getTeamStats, getTeamLeaderboard, getTeamsList, getTeamInfo } from '../controllers/teamController'
import { validatePagination } from '../middlewares/validatePagination';
import { validateTeamId } from '../middlewares/validateTeam'   ;   
import { validateDateRange } from '../middlewares/validateDate';

const router = express.Router()

// List all teams
router.get('/', validatePagination, getTeamsList)

// Get team infos
router.get('/:id', validateTeamId, getTeamInfo)

// Get team stats , total coins, list of members and info.
router.get('/:id/stats', validateTeamId, validatePagination, getTeamStats)

// Get team stats , total coins, list of members and info. With Date Range
router.get('/:id/leaderboard', validateTeamId, validatePagination, validateDateRange, getTeamLeaderboard) 

export default router
