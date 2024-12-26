import { Router } from 'express';
import { getAllTeachers, createTeacher } from '../../models/teacherModel';

const router = Router();

router.get('/', (_, res) => {
  const teachers = getAllTeachers();
  return res.json(teachers);
});

router.post('/', (req, res) => {
  const { name, subject } = req.body;
  if (!name || !subject) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const newTeacher = createTeacher({ name, subject });
  return res.status(201).json(newTeacher);
});

export default router;
