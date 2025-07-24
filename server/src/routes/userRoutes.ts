import express from 'express'
import { getUserInfo } from '../controllers/userController'

const router = express.Router()

router.get('/:id', getUserInfo)

export default router
