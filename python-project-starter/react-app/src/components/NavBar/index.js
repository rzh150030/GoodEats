import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../components/auth/LogoutButton';

const NavBar = ({loaded}) => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const loginButton = () => {
    history.push("/login")
  }

  const signupButton = () => {
    history.push("/sign-up")
  }

  let sessionButtons;
  if (sessionUser) {
    sessionButtons = (
      <>
        <LogoutButton />
      </>
    );
  }
  else {
    sessionButtons = (
      <>
        <button onClick={loginButton} className="session-button">Log In</button>
        <button onClick={signupButton} className="session-button">Sign Up</button>
      </>
    );
  }

  return (
    <nav>
      <NavLink exact to='/'>
        Good Eats
      </NavLink>
      <NavLink to='/recipe/create' exact={true} activeClassName='active'>
        Create a Recipe
      </NavLink>
      {loaded && sessionButtons}
    </nav>
  );
}

export default NavBar;
