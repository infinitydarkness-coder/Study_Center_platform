import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  BookOpen, 
  MapIcon, 
  Award, 
  MessageCircle, 
  User, 
  Menu, 
  X,
  Settings,
  Bell,
  ChevronDown,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import ChatBot from "./chatbot";

const navItems = [
  { path: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/app/courses", icon: GraduationCap, label: "My Courses" },
  { path: "/app/roadmaps", icon: MapIcon, label: "AI Roadmap" },
  { path: "/app/certificates", icon: Award, label: "Certificates" },
  { path: "/app/profile", icon: User, label: "Profile" },
];

export default function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#E8EDF5] flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#F5F3EF] border-r border-border z-50
          transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-400 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1e3a8a]">Study Center</span>
            </Link>
            <button
              className="lg:hidden text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-[#1e3a8a] hover:bg-white/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-border px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                to="/app"
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  location.pathname === "/app"
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/app/courses"
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  location.pathname.startsWith("/app/courses") || location.pathname.startsWith("/app/subject")
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Courses
              </Link>
              <Link
                to="/app/roadmaps"
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  location.pathname.startsWith("/app/roadmaps")
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Roadmap
              </Link>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                AI Chatbot
              </button>
            </nav>

            {/* Right Side - Notifications and Profile */}
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">John Doe</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Floating Chatbot */}
      <ChatBot />
    </div>
  );
}