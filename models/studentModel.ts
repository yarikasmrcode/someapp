// models/studentModel.ts
export interface Student {
  id: string;
  name: string;
  grade: number;
}

let students: Student[] = [
  { id: 's1', name: 'Alice', grade: 5 },
];

export function getAllStudents(): Student[] {
  return students;
}

export function createStudent(data: Omit<Student, 'id'>): Student {
  const newStudent: Student = {
    id: `s${Date.now()}`,
    ...data,
  };
  students.push(newStudent);
  return newStudent;
}
