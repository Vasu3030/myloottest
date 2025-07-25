import express from 'express'
import { getTeamStats, getTeamLeaderboard, getTeamsList, getTeamInfo } from '../controllers/teamController'

const router = express.Router()

// List all teams
router.get('/', getTeamsList)

// Get team infos
router.get('/:id', getTeamInfo)

// Get team stats , total coins, list of members and info.
router.get('/:id/stats', getTeamStats)

// Get team stats , total coins, list of members and info. With Date Range
router.get('/:id/leaderboard', getTeamLeaderboard) 

export default router
