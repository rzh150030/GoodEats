import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userRecipes } from '../../store/recipe';
import { getFavoredRecipes } from '../../store/favorite';
import "./ProfilePage.css";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userOwnRecipes = useSelector(state => Object.values(state.recipe.userRecipes));
    const userFavorites = useSelector(state => state.favoriteRecipe.favorites);

    useEffect(() => {
        dispatch(userRecipes(sessionUser.id));
        dispatch(getFavoredRecipes(sessionUser.id));
    }, [dispatch, sessionUser.id]);

    return (
        <div className="user-profile-page">
            <div id="profile-labels">
                <span>Your Recipes</span>
                <span>Favorite Recipes</span>
            </div>
            <div className="profile-items">
                <div className="profile-recipes-container">
                    {userOwnRecipes.length ? userOwnRecipes.sort(({id: a}, {id: b}) => b - a).map(recipe => (
                        <div className="user-recipe-containers" key={recipe.id}>
                            <NavLink to={`/recipe/detail/${recipe.id}`} className="profile-links">
                                {recipe.name}
                            </NavLink>
                        </div>
                    )) :
                        <div>
                            <h2>You have no recipes</h2>
                            <NavLink to="/recipe/create">Let's create one!</NavLink>
                        </div>}
                </div>
                <div className="profile-recipes-container">
                    {userFavorites.length ? userFavorites.map(recipe => (
                        <div className="user-recipe-containers" key={recipe.id}>
                            <NavLink to={`/recipe/detail/${recipe.id}`} className="profile-links">
                                <h3>{recipe.name}</h3>
                                <span id="recipe-owner-name">{`By: ${recipe.User.username}`}</span>
                            </NavLink>
                        </div>
                    )) :
                        <div>
                            <h2>You have no favorites</h2>
                            <NavLink to="/">Let's find one!</NavLink>
                        </div>}
                </div>
            </div>
        </div>
    )
}
