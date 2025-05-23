import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link href="/dashboard/admin" className="nav-link">
        Admin
      </Link>
      <Link href="/dashboard/admin/category" className="nav-link">
        Create Category
      </Link>
    </nav>
  );
}
