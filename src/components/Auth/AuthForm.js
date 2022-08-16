import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/auth-Context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading , setIsLoading ] = useState(false)
  const history = useHistory()
  const {loginHandler} = useContext(AuthContext)


// Que se esta manejando aqui? manejando el input con useref
// uso :  1. creando variables de los inputs 
//        2. conectar el ref a mi input 
  const emailInputRef = useRef("")
  const PasswordInputRef = useRef("")
  // -------------------

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handlerSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const emailValue = emailInputRef.current.value
    const passwordValue = PasswordInputRef.current.value
  
    // opcional validate 
    let url ;
    if( isLogin){
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeqxlhL0Ao3BZi-hbOcTRj66Ni7K6DJuU"
    }else{
      url =   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeqxlhL0Ao3BZi-hbOcTRj66Ni7K6DJuU"
    }

    fetch(url,{
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then( res => {
        setIsLoading(false)

        // si la request fue exitosa 
        if( res.ok ){
            return res.json()
        }else{
          return res.json().then( data =>{
            throw new Error("authetication Fail")
          })
        }
      }).then( data => {
        loginHandler(data.idToken)
        history.replace("/")
      
      }).catch( error => {alert(error.message)})
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handlerSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          {/* conectando mis refs */}
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          {/* conectando mis refs */}
          <input type='password' id='password' required ref={PasswordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading ? <button>{isLogin ? 'Login' : 'Create Account'}</button> : "Loading"}
          
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
