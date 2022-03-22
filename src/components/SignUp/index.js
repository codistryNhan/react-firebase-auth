import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
// import { set } from "firebase/database";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const SignUpFormBase = ({ firebase }) => {
  const [state, setState] = React.useState(INITIAL_STATE);
  const { username, email, passwordOne, passwordTwo, error } = state;
  const navigate = useNavigate();

  const handleChange = (event) => {
    setState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
    console.log(state);
  };

  const handleSubmit = (event) => {
    const { username, email, passwordOne } = state;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(async (authUser) => {
        //Create user in Firebase realtime
        const ref = await firebase.user(authUser.user.uid);
        firebase.set(ref, { username, email });
      })
      .then(() => {
        setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch((error) => {
        setState({ error });
      });

    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={username}
        onChange={handleChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={handleChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={handleChange}
        type="text"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={handleChange}
        type="text"
        placeholder="Confirm Password"
      />

      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
