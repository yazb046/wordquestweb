import React from "react";
import { Route, RouteProps, Navigate, Outlet} from "react-router-dom";
import LoginPage from "../pages/security/LoginPage";
import { useUser } from "../hooks/useUser";


const PrivateRoute = () => {
  const user = useUser();
  if (!user) {
    return (<Navigate to="/login" replace/>);
}
  return (<Outlet/>);
};

export default PrivateRoute;
