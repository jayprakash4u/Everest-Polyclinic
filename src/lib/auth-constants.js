export const ADMIN_SESSION_COOKIE = "admin_session";

export function isAdminDevBypassEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.ADMIN_DEV_BYPASS === "true"
  );
}

export function getDevAdminSession() {
  return {
    adminId: 0,
    email: process.env.ADMIN_EMAIL ?? "admin@everestpolyclinic.com",
    name: "Dev Admin",
    role: "super_admin",
  };
}
