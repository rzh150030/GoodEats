import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./css/SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form">
      <ul className="errors">
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
      <label className="signup-labels">User Name</label>
      <div>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          className="input-signup"
        ></input>
      </div>
      <label className="signup-labels">Email</label>
      <div>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          className="input-signup"
        ></input>
      </div>
      <label className="signup-labels">Password</label>
      <div>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          className="input-signup"
        ></input>
      </div>
      <label className="signup-labels">Repeat Password</label>
      <div>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          className="input-signup"
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
