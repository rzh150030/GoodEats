import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getRecipe } from '../../store/recipe';

export default function RecipeDetailPage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => { //fetch recipe from database
        dispatch(getRecipe(id));
    }, [id, sessionUser]);

    return (
        <div>
            <h1>{currentRecipe.name}</h1>
            <label>Ingredients: </label>
            <ul>
                {currentRecipe.ingredients.map(ingred => (
                    <li>{ingred.ingredient}</li>
                ))}
            </ul>
            <label>Directions: </label>
            <ol>
                {currentRecipe.directions.map(direct => (
                    <li>{direct.step}</li>
                ))}
            </ol>
            
        </div>
    )
}
