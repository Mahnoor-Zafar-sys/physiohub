import { Navigate, useLocation } from "react-router-dom";

/**
 * AuthGuard — Protects routes by checking authentication state and role.
 * @param {string[]} allowedRoles - Roles permitted to access the wrapped route
 * @param {React.ReactNode} children - The protected content
 */
export default function AuthGuard({ allowedRoles, children }) {
  const location = useLocation();
  const token = localStorage.getItem("vph_token");
  const role = localStorage.getItem("vph_user_role");

  // Not authenticated → redirect to login with return URL
  if (!token || !role) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Authenticated but wrong role → redirect to their own portal
  if (allowedRoles && !allowedRoles.includes(role)) {
    const portalMap = {
      patient: "/patient-portal",
      doctor: "/doctor-portal",
      admin: "/admin",
      receptionist: "/admin",
    };
    return <Navigate to={portalMap[role] || "/"} replace />;
  }

  return children;
}
