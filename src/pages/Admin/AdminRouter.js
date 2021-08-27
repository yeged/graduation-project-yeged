import React from "react";
import { Route } from "react-router";
import { Redirect, Switch } from "react-router-dom";
import AuthProvider from "../../context/AuthContext";
import ApplicationList from "./ApplicationList/ApplicationList";
import ApplicationResponse from "./ApplicationResponse/ApplicationResponse";
import Login from "./Login/Login";

const AdminRouter = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/admin/basvuru/:applicationNo">
          <ApplicationResponse />
        </Route>
        <Route path="/admin/basvuru-listesi">
          <ApplicationList />
        </Route>
        <Route exact path="/admin">
          <Login />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </AuthProvider>
  );
};
export default AdminRouter;
