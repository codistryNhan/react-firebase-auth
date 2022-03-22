import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AccountPage from "../Account";
import AdminPage from "../Admin";
import HomePage from "../Home";
import LandingPage from "../Landing";
import PasswordForgetPage from "../PasswordForget";
import SignInPage from "../SignIn";
import SignUpPage from "../SignUp";
import Navigation from "../Navigation";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Routes>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
          <Route
            path={ROUTES.PASSWORD_FORGET}
            element={<PasswordForgetPage />}
          />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default withAuthentication(App);
