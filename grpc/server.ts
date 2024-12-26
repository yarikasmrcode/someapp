// grpc/server.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

interface Course {
  id: string;
  name: string;
  teacherId: string;
}

let courses: Course[] = [];

export default function startGrpcServer() {
  const PROTO_PATH = path.join(__dirname, 'course.proto');
  const packageDefinition = protoLoader.loadSync(PROTO_PATH);
  const protoDescriptor: any = grpc.loadPackageDefinition(packageDefinition);

  const courseService = protoDescriptor.course.CourseService;

  const server = new grpc.Server();

  server.addService(courseService.service, {
    CreateCourse: (call: any, callback: any) => {
      const { name, teacherId } = call.request;
      const newCourse: Course = {
        id: `c${Date.now()}`,
        name,
        teacherId,
      };
      courses.push(newCourse);

      callback(null, { course: newCourse });
    },
    ListCourses: (_call: any, callback: any) => {
      callback(null, { courses });
    },
  });

  const address = '0.0.0.0:50051';
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err: Error | null) => {
    if (err) {
      console.error('Failed to start gRPC server:', err);
      return;
    }
    console.log(`gRPC server started on ${address}`);
    server.start();
  });
}
