import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./css/LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className="login-form">
      <ul className='errors'>
        {errors.map((error, ind) => (
          <li key={ind}>{error}</li>
        ))}
      </ul>
      <label htmlFor='email' className="login-labels">Email</label>
      <div>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          className="input-login"
        />
      </div>
      <label htmlFor='password' className="login-labels">Password</label>
      <div>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className="input-login"
        />
      </div>
      <button type='submit' className="submit-login">Login</button>
      <button type="submit" onClick={demoLogin} className="submit-login">Demo</button>
    </form>
  );
};

export default LoginForm;
