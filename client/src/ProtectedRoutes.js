import { Outlet, Navigate } from "react-router-dom";
export default function ProtectedRoutes({ loggedIn }) {
  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}
