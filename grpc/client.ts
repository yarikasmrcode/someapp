// grpc/client.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, 'course.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition);
const coursePackage = protoDescriptor.course;

const client = new coursePackage.CourseService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

export function createCourse(name: string, teacherId: string) {
  return new Promise((resolve, reject) => {
    client.CreateCourse({ name, teacherId }, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response.course);
    });
  });
}

export function listCourses() {
  return new Promise((resolve, reject) => {
    client.ListCourses({}, (err: any, response: any) => {
      if (err) return reject(err);
      resolve(response.courses);
    });
  });
}
