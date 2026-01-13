import { typeDefs as paginationTypeDef } from "./pagination.type.ts";
import { typeDefs as sortTypeDef } from "./sort.type.ts";
import { typeDefs as objectIdTypeDef } from "../scalar/objectid.scalar.ts";
import { typeDefs as dateTypeDef } from "../scalar/date.scalar.ts";

export const sharedTypeDefs = [
  objectIdTypeDef,
  dateTypeDef,
  paginationTypeDef,
  sortTypeDef,
];

export const baseTypeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type ActionResponse {
    id: ObjectId
    message: String
  }
`;