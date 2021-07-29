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

    const editRecipe = () => {
        history.push(`/recipe/edit/${currentRecipe.id}`);
    }

    const deleteRecipe = async () => {
        //let deleted = await dispatch(deleteRecipe(currentRecipe.id));

        //if (deleted) history.push("/");
    }

    let editDeleteButton;
    if (sessionUser && sessionUser.id === currentRecipe.user_id) {
        editDeleteButton = (
            <div>
                <button onClick={editRecipe}>Edit</button>
                <button onClick={deleteRecipe}>Delete</button>
            </div>
        );
    }

    return (
        <article>
            <h1>{currentRecipe.name}</h1>
            <label>Ingredients: </label>
            <ul>
                {currentRecipe.ingredients?.map(ingred => (
                    <li key={ingred.id}>{ingred.ingredient}</li>
                ))}
            </ul>
            <label>Directions: </label>
            <ol>
                {currentRecipe.directions?.map(direct => (
                    <li key={direct.id}>{direct.step}</li>
                ))}
            </ol>
            <div>
                {editDeleteButton}
                <h2>Category: {currentRecipe.category_name}</h2>
            </div>
        </article>
    )
}
