import { createRequire } from "node:module";

export { isDatabaseAvailable, querySql, findAdminByEmail } from "./sql.js";

const require = createRequire(import.meta.url);
let prismaClient;

export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      if (!prismaClient) {
        prismaClient = require("./db-native.cjs").prisma;
      }

      const value = prismaClient[prop];
      return typeof value === "function" ? value.bind(prismaClient) : value;
    },
  },
);
