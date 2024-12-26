import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Teacher {
    id: String!
    name: String!
    subject: String!
  }

  type Student {
    id: String!
    name: String!
    grade: Int!
  }

  type Query {
    teachers: [Teacher!]!
    students: [Student!]!
  }

  type Mutation {
    createTeacher(name: String!, subject: String!): Teacher!
    createStudent(name: String!, grade: Int!): Student!
  }
`;
