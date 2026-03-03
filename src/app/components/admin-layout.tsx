import { Link, Outlet, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Grid3x3,
  Clock,
  Award,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/courses", label: "Courses", icon: BookOpen },
  { path: "/admin/subjects", label: "Subjects", icon: FolderOpen },
  { path: "/admin/categories", label: "Categories", icon: Grid3x3 },
  { path: "/admin/pending-uploads", label: "Pending Uploads", icon: Clock },
  { path: "/admin/certificates", label: "Certificates", icon: Award },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="p-6">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[#1e3a8a]">Study Center</div>
              <div className="text-xs text-gray-500">Admin Panel</div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    active
                      ? "bg-blue-50 text-[#2563EB]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
