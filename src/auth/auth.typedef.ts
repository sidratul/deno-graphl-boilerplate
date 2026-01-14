export const typeDefs = `
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ObjectId!
    name: String!
    email: String!
    role: Role
    createdAt: Date
    updatedAt: Date
  }

  type AuthResponse {
    token: String
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    profile: User!
  }

  extend type Mutation {
    register(input: RegisterInput!): ActionResponse!
    login(input: LoginInput!): AuthResponse!
  }
`;