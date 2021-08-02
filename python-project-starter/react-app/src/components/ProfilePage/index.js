import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userRecipes } from '../../store/recipe';
import { getFavoredRecipes } from '../../store/favorite';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userOwnRecipes = useSelector(state => Object.values(state.recipe.userRecipes));
    const userFavorites = useSelector(state => state.favoriteRecipe.favorites);

    useEffect(() => {
        dispatch(userRecipes(sessionUser.id));
        dispatch(getFavoredRecipes(sessionUser.id));
    }, [dispatch])

    return (
        <div className="user-profile-page">
            <div>
                <span>Your Recipes</span>
                <span>Favorite Recipes</span>
            </div>
            <div className="profile-items">
                <div className="profile-recipes-container">
                    {userOwnRecipes && userOwnRecipes.map(recipe => (
                        <div className="user-recipe-containers" key={recipe.id}>
                            <NavLink to={`/recipe/detail/${recipe.id}`}>
                                {recipe.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
                <div className="profile-recipes-container">
                    {userFavorites && userFavorites.map(recipe => (
                        <div className="user-recipe-containers" key={recipe.id}>
                            <NavLink to={`/recipe/detail/${recipe.id}`}>
                                {recipe.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}