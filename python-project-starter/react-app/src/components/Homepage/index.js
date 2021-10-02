import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRecipes } from '../../store/recipe';
import "./Homepage.css";

export default function Homepage() {
    const dispatch = useDispatch();
    const recipeList = useSelector(state => Object.values(state.recipe.recipes));

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    return (
        <div className="home-page">
            <div id="recent-recipe-title">
                <span>Recent Recipes</span>
            </div>
            <div className="recent-recipes-container">
                {recipeList?.sort(({id: a}, {id: b}) => b - a).map(recipe => (
                    <NavLink to={`/recipe/detail/${recipe.id}`} className="recipe-links" key={recipe.id}>
                        <h3 id="recipe-name">{recipe.name}</h3>
                        <span id="home-owner-username">{"By: " + recipe.User?.username}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
