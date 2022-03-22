import React from "react";
import { useNavigate } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { PasswordForgetLink } from "../PasswordForget";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

const SignInFormBase = ({ firebase }) => {
  const [state, setState] = React.useState(INITIAL_STATE);
  const { email, password, error } = state;
  const navigate = useNavigate();

  const isInvalid = password === "" || email === "";

  const handleChange = (event) => {
    setState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    const { email, password } = state;
    console.log(state);

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("signed in success");
        console.log(user);
        setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch((error) => {
        setState((prevState) => {
          return { ...prevState, error };
        });
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = withFirebase(SignInFormBase);

export default SignInPage;

export { SignInForm };
