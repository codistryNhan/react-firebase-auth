import React from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [state, setState] = React.useState(INITIAL_STATE);

  const handleChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    const { email } = state;

    firebase
      .doPasswordReset(email)
      .then(() => {
        setState(INITIAL_STATE);
      })
      .catch((error) => setState({ error }));

    event.preventDefault();
  };

  const isInvalid = state.email === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
