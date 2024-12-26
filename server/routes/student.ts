import { Router } from 'express';
import { getAllStudents, createStudent } from '../../models/studentModel';

const router = Router();

router.get('/', (_, res) => {
  const students = getAllStudents();
  return res.json(students);
});

router.post('/', (req, res) => {
  const { name, grade } = req.body;
  if (!name || typeof grade !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newStudent = createStudent({ name, grade });
  return res.status(201).json(newStudent);
});

export default router;
