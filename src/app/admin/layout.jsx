import { headers } from "next/headers";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const pathname = (await headers()).get("x-pathname") || "";

  if (pathname === "/admin/login") {
    return children;
  }

  const session = await getAdminSession();

  return (
    <AdminShell adminName={session?.name ?? "Admin"}>{children}</AdminShell>
  );
}
