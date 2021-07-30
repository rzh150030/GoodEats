import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./Homepage.css";

export default function Homepage() {
    const recipeList = useSelector(state => Object.values(state.recipe.recipes));

    return (
        <div className="home-page">
            <div id="recent-recipe-title">
                <span>Recent Recipes</span>
            </div>
            <div className="recent-recipes-container">
                {recipeList.map(recipe => (
                    <div className="recipes-container" key={recipe.id}>
                        <NavLink to={`/recipe/detail/${recipe.id}`} className="recipe-links">
                            {recipe.name}
                        </NavLink>
                        <span>{"By: " + recipe.User?.username}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
