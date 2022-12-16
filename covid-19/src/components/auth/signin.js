import React ,{useContext,useEffect} from "react";
import {Redirect ,Switch ,Link} from 'react-router-dom';
import './signin.css'
import cookie from 'react-cookies'
import {LoginContext} from '../../context/authContext'


const  SignIn =  () => {
  useEffect(() => {
    window.scrollTo(0, 250);
  }, []);

  const auth =useContext(LoginContext)

  const handleLogin = async (e) => {

  
    e.preventDefault();
        const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    auth.loginFunction(body.username , body.password )
   
    auth.loginStatus(true)

  };
  return ( 
    <section className="main-class">
  

      <form onSubmit={handleLogin} className="loginForm">
        <br></br>
        <label>Username</label>
        <input type="text" name="username" required></input>
        <label>Password </label>
        <input type="password" name="password" required />
       
        <button className="buttonSignin">login </button>
      <Link to={'/signup'}>
            <p className='signinlink'>
              <i className='fa fa-sign-out'></i> Don't have account ?  Sign Up
            </p>
            </Link>
      </form>

     
    
      

    {cookie.load('id') ?  <Switch>
      <Redirect from="*" to="/" ></Redirect>
    </Switch>
  :<></>  
  }
   {auth.loginStatus ? <> <Switch>
    <Redirect from='/signup' to={`/`}></Redirect>
    </Switch></> : <> </>}
    </section>
  );
};
export default SignIn;