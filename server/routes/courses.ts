import { Router } from 'express';
import { createCourse, listCourses } from '../../grpc/client';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const courses = await listCourses();
    return res.status(200).json(courses);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, teacherId } = req.body;
  if (!name || !teacherId) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  try {
    const course = await createCourse(name, teacherId);
    return res.status(201).json(course);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
