export const typeDefs = `
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

  extend type Mutation {
    register(input: RegisterInput!): ActionResponse!
    login(input: LoginInput!): AuthResponse!
  }
`;