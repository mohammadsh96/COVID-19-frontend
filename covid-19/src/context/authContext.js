import React, { useState, useEffect } from "react";
import superagent from "superagent";
import base64 from "base-64";
import cookie from "react-cookies";
import axios from "axios";
import Swal from "sweetalert2";
import {API} from '../utilize/utilize';

export const LoginContext = React.createContext();
export default function LoginProvider(props) {
  const [signUp, setSignUp] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({
    username: cookie.load("username") || "",
    actions: cookie.load("actions") || [],
    id: cookie.load("id") || null,
  });

  useEffect(() => {
    const tokenFromCookies = cookie.load("token");

    if (tokenFromCookies) {
      setLoginStatus(true);
      setUser(user);
    } else {
      setLoginStatus(false);
      setUser({});
    }
    // eslint-disable-next-line
  }, []);

  const SignUpFunction = async (username, password) => {
    try {
      const userData = { username: `${username}`, password: `${password}` };
   let data= await axios
        .post(`${API}/signup`, userData)
        
        if(data){
          setSignUp(true)
          Swal.fire({
            icon: "success",
            title: "Sign up",
            text: "You have signed Up successfully!",
          })
        }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sign up",
        text: "username already in use",
      })
      console.log(err);
    }
  };
  const loginFunction = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set(
          "authorization",
          `Basic ${base64.encode(`${username}:${password}`)}`
        );
if(response){

  validateMyUser(response.body.user);
}
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "try again",
      })
      return "error";
    }
  };

  const logoutFunction = () => {
    setLoginStatus(false);
    setUser({});
    cookie.remove("token");
    cookie.remove("username");
    cookie.remove("id");
  };
  const validateMyUser = (user) => {
    if (user.token) {
      setLoginStatus(true);
      setUser(user);
      cookie.save("token", user.token);
      cookie.save("username", user.username);
      cookie.save("id", user.id);
      window.location.reload();
    } else {
      setLoginStatus(false);
      setUser({});
    }
  };

  const state = {
    loginStatus: loginStatus,
    SignUpFunction: SignUpFunction,
    loginFunction: loginFunction,
    logoutFunction: logoutFunction,
    user: user,
    signUp: signUp,
  };
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
