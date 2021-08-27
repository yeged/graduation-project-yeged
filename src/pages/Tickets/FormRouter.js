import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  ApplicationForm,
  ApplicationSuccess,
  ApplicationInquiry,
  ApplicationInfo,
} from ".";
import My404 from "../My404/My404";

const FormRouter = () => {
  return (
    <Switch>
      <Route path="/basvuru/:applicationNo">
        <ApplicationInfo />
      </Route>
      <Route path="/basvuru-sorgula">
        <ApplicationInquiry />
      </Route>
      <Route path="/basvuru-olustur">
        <ApplicationForm />
      </Route>
      <Route path="/basvuru-basarili">
        <ApplicationSuccess />
      </Route>
      <Route path="/404">
        <My404 />
      </Route>
      <Route exact path="/">
        <Redirect to="/basvuru-olustur" />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default FormRouter;
