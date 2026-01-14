// Enum untuk role pengguna
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Array role untuk validasi dan referensi
export const USER_ROLES = [UserRole.USER, UserRole.ADMIN] as const;

// Type untuk role
export type RoleType = typeof USER_ROLES[number];

// Enum untuk status respons
export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

// Status HTTP
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}