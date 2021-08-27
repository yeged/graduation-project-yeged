import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FormProvider from "./context/FormContext";
import AdminRouter from "./pages/Admin/AdminRouter";
import FormRouter from "./pages/Tickets/FormRouter";

const App = () => {
  return (
    <div>
      <FormProvider>
        <Router>
          <Switch>
            <Route path="/admin">
              <AdminRouter />
            </Route>
            <Route path="/">
              <FormRouter />
            </Route>
          </Switch>
        </Router>
      </FormProvider>
    </div>
  );
};

export default App;
