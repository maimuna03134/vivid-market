import AdminShell from "@/components/admin/layout/AdminShell";

// admin sidebar + topbar wrapper
export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}