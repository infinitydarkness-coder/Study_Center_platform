import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import DashboardLayout from "./components/dashboard-layout";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import SubjectPage from "./pages/subject-page";
import RoadmapPage from "./pages/roadmap-page";
import CertificatesPage from "./pages/certificates-page";
import ProfilePage from "./pages/profile-page";
import AdminLayout from "./components/admin-layout";
import AdminDashboard from "./pages/admin/admin-dashboard";
import AdminCourses from "./pages/admin/courses";
import AdminSubjects from "./pages/admin/subjects";
import AdminCategories from "./pages/admin/categories";
import AdminPendingUploads from "./pages/admin/pending-uploads";
import AdminCertificates from "./pages/admin/certificates";
import AdminUsers from "./pages/admin/users";
import AdminSettings from "./pages/admin/settings";
import NotFound from "./pages/not-found";
import ErrorBoundary from "./pages/error-boundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/login",
    Component: LoginPage,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/signup",
    Component: SignupPage,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: "/app",
    Component: DashboardLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: Dashboard },
      { path: "courses", Component: Courses },
      { path: "subject/:id", Component: SubjectPage },
      { path: "roadmaps", Component: RoadmapPage },
      { path: "certificates", Component: CertificatesPage },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "courses", Component: AdminCourses },
      { path: "subjects", Component: AdminSubjects },
      { path: "categories", Component: AdminCategories },
      { path: "pending-uploads", Component: AdminPendingUploads },
      { path: "certificates", Component: AdminCertificates },
      { path: "users", Component: AdminUsers },
      { path: "settings", Component: AdminSettings },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);