export const typeDefs = ["type RegisterResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  Register(password: String!): RegisterResponse!\n}\n\ntype Admin {\n  id: ID!\n  username: String!\n  password: String!\n}\n\ntype Query {\n  admin: Admin\n}\n"];
/* tslint:disable */

export interface Query {
  admin: Admin | null;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
}

export interface Mutation {
  Register: RegisterResponse;
}

export interface RegisterMutationArgs {
  password: string;
}

export interface RegisterResponse {
  ok: boolean;
  error: string | null;
}
