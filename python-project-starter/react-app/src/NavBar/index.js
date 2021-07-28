import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../components/auth/LogoutButton';

const NavBar = ({loaded}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const logOutUser = () => {
    dispatch(logout());
  }

  let sessionButtons;
  if (sessionUser) {
    sessionButtons = (
      <>
        <button onClick={logOutUser} className="session-button">Log Out</button>
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
      <NavLink to='/create' exact={true} activeClassName='active'>
        Create a Recipe
      </NavLink>
      {loaded && sessionButtons}
    </nav>
  );
}

export default NavBar;
