import express from 'express'
import { getUserInfo } from '../controllers/userController'

const router = express.Router()

// Get user infos, name, total coins, team info.
router.get('/:id', getUserInfo)

export default router
