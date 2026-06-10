import type { Metadata } from "next";
import AdminNav from "../../components/admin/AdminNav";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNav signOutAction={logout} />
      {children}
    </>
  );
}
