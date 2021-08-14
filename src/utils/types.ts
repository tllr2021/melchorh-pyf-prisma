import { Prisma, prisma } from "../generated/prisma-client";

export interface User {
  email: string;
  categories: string[];
}

export interface Category {
  request: any;
  user: any;
}

export interface Context {
  prisma: Prisma;
  request: any;
  user: any;
}