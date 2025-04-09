import {Router} from 'express';
import { createTask, deleteTask, getMyTask, getTaskById, updateTask } from '../controllers/taskController.js';

const router = Router();

router.post('/documents', createTask);
router.delete('/documents-delete/:id', deleteTask);
router.put('/documents-update/:id', updateTask);
router.get('/documents', getMyTask);
router.get('/documents/:taskId', getTaskById);

export default router;
