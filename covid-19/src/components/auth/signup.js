import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect, Switch } from "react-router-dom";
import "./signup.css";
import { LoginContext } from "../../context/authContext";
const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);
  const auth = useContext(LoginContext);

  const handleLogin = (e) => {
    e.preventDefault();

    auth.SignUpFunction(e.target.username.value, e.target.password.value);
  };

  return (
    <section className="main-class">
      <form onSubmit={handleLogin} className="loginForm">
        <div>
          <label>Username</label>
          <input type="text" name="username" required></input>
        </div>
        <div>
          <label>Password </label>
          <input type="password" name="password" required />
        </div>

        <button className="buttonSignup">Sign Up</button>
        <Link to={"/signin"}>
          <p className="signinlink">
            <i className="fa fa-sign-out"></i> already have account ? Sign In
          </p>
        </Link>
      </form>

      {auth.signUp ? (
        <>
          {" "}
          <Switch>
            <Redirect from="/signup" to={`/signin`}></Redirect>
          </Switch>
        </>
      ) : (
        <> </>
      )}

      {auth.loginStatus ? (
        <>
          {" "}
          <Switch>
            <Redirect from="/signup" to={`/signin`}></Redirect>
          </Switch>
        </>
      ) : (
        <> </>
      )}
    </section>
  );
};
export default SignUp;
