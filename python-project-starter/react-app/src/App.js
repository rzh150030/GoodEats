import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RecipePage from './components/RecipePage';
import CreateRecipe from './components/CreateRecipe';
import { authenticate } from './store/session';
import { grabCategories, getAllRecipes } from './store/recipe';
import Homepage from './components/Homepage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(grabCategories());
    dispatch(getAllRecipes());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded}/>
      {loaded && (
        <Switch>
          <Route path="/" exact={true}>
            <Homepage />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/recipe/detail/:id">
            <RecipePage />
          </Route>
          <ProtectedRoute path="/recipe/create" exact={true}>
            <CreateRecipe />
          </ProtectedRoute>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
