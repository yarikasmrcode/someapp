import { getAllTeachers, createTeacher } from '../models/teacherModel';
import { getAllStudents, createStudent } from '../models/studentModel';

export const resolvers = {
  Query: {
    teachers: () => getAllTeachers(),
    students: () => getAllStudents(),
  },
  Mutation: {
    createTeacher: (_: unknown, args: { name: string; subject: string }) => {
      return createTeacher(args);
    },
    createStudent: (_: unknown, args: { name: string; grade: number }) => {
      return createStudent(args);
    },
  },
};
