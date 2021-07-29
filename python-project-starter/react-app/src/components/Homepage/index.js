import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Homepage() {
    const recipeList = useSelector(state => Object.values(state.recipe.recipes));

    return (
        <div>
            <div>
                <span>Recent Recipes</span>
            </div>
            <div>
                {recipeList.map(recipe => (
                    <div key={recipe.id}>
                        <NavLink to={`/recipe/detail/${recipe.id}`}>
                            {recipe.name}
                        </NavLink>
                        <span>{"By: " + recipe.User?.username}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
