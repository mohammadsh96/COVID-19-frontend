import React, { useState } from "react";
import "./nav.css";
import cookie from "react-cookies";
export default function Nav() {
  const [loginStatus, setLoginState] = useState(
    cookie.load("token") ? true : false
  );

  const updateLoginStatus = () => {
    cookie.remove("token");
    cookie.remove("id");
    cookie.remove("username");
    setLoginState(false);
    window.location.reload();
  };
  
  return (
    <div className="nav">
      <nav>
        <div>
          <a href="/">Home</a>
          <a href="AllCountries">All Countries</a>
          <a href="MyRecords">My Records</a>
        </div>
        {loginStatus ? (
          <>
            <h3>Hey {`${cookie.load("username")}`}ð ,You're Welcome</h3>
            <button onClick={() => updateLoginStatus()}> log-Outð</button>
          </>
        ) : (
          <div className="auth">
            <a href="/signup">signup</a>
            <a href="/signin">signin</a>
          </div>
        )}
      </nav>
    </div>
  );
}
