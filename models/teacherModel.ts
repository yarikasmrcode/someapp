// models/teacherModel.ts
export interface Teacher {
  id: string;
  name: string;
  subject: string;
}

let teachers: Teacher[] = [
  { id: 't1', name: 'Mr. Smith', subject: 'Math' },
];

export function getAllTeachers(): Teacher[] {
  return teachers;
}

export function createTeacher(data: Omit<Teacher, 'id'>): Teacher {
  const newTeacher: Teacher = {
    id: `t${Date.now()}`,
    ...data,
  };
  teachers.push(newTeacher);
  return newTeacher;
}
