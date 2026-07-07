import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  // Not logged in → send to login
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);

  // Logged in but wrong role → send them to their own home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "CLIENT" ? "/portal" : "/dashboard"} replace />;
  }

  // All good → show the page
  return <>{children}</>;
}