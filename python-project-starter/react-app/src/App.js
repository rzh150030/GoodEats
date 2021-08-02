import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RecipeDetailPage from './components/RecipeDetailPage';
import CreateRecipe from './components/CreateRecipe';
import EditRecipe from "./components/EditRecipe";
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import { grabCategories, getAllRecipes } from './store/recipe';
import Homepage from './components/Homepage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const recipeList = useSelector(state => Object.values(state.recipe.recipes));

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
    dispatch(grabCategories());
    dispatch(getAllRecipes())
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
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          {recipeList.map(recipe => (
            <Route path="/recipe/detail/:id" key={recipe.id}>
              <RecipeDetailPage />
            </Route>
          ))}
          {recipeList.map(recipe => (
            <ProtectedRoute path="/recipe/edit/:id" key={recipe.id}>
              <EditRecipe />
            </ProtectedRoute>
          ))}
          <ProtectedRoute path="/recipe/create" exact={true}>
            <CreateRecipe />
          </ProtectedRoute>
        </Switch>
      )}
      <footer>
        About:
        <a href="https://www.linkedin.com/in/richard-huang-0a6658207/">LinkedIn</a>
        <a href="https://github.com/rzh150030">Github</a>
        <a href="https://github.com/rzh150030/GoodEats">Repo</a>
      </footer>
    </BrowserRouter>
  );
}

export default App;
