import { findAdminByEmail, isDatabaseAvailable } from "../../src/lib/sql.js";

console.log("DB available:", await isDatabaseAvailable());
const admin = await findAdminByEmail("admin@everestpolyclinic.com");
console.log("Admin:", admin);
