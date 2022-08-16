import { useContext, useRef } from 'react';
import { AuthContext } from '../../store/auth-Context';
import { useHistory } from 'react-router-dom'
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const PasswordInputRef = useRef("")
  const {token} = useContext(AuthContext)
  const history = useHistory()
  const handlerFormPassword = (e) => {
     e.preventDefault()
     const passwordInputRefValue = PasswordInputRef.current.value

     fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDeqxlhL0Ao3BZi-hbOcTRj66Ni7K6DJuU",
     {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
        password: passwordInputRefValue,
        returnSecureToken: false
      }),  
      headers:{
        'Content-Type': 'application/json'
      }
     
     }).then( data => {
      
      history.replace("/")
     })
  }
  return (
    <form className={classes.form} onSubmit={ handlerFormPassword }>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={PasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
