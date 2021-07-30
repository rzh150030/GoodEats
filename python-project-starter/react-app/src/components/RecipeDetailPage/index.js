import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../../store/recipe';
import "./RecipeDetailPage.css";

export default function RecipeDetailPage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => { //fetch recipe from database
        dispatch(getRecipe(id));
    }, [dispatch, id, sessionUser]);

    const editRecipe = () => {
        history.push(`/recipe/edit/${currentRecipe.id}`);
    }

    const deletion = async () => {
        let deleted = await dispatch(deleteRecipe(currentRecipe.id));

        if (deleted) history.push("/");
    }

    let editDeleteButton;
    if (sessionUser && sessionUser.id === currentRecipe.user_id) {
        editDeleteButton = (
            <div>
                <button onClick={editRecipe}>Edit</button>
                <button onClick={deletion}>Delete</button>
            </div>
        );
    }

    return (
        <article className="recipe-detail-page">
            <h1>{currentRecipe.name}</h1>
            <div>
                <label>Ingredients: </label>
                <ul>
                    {currentRecipe.ingredients?.sort(({id: a}, {id: b}) => a - b).map(ingred => (
                        <li key={ingred.id}>{ingred.ingredient}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Directions: </label>
                <ol>
                    {currentRecipe.directions?.sort(({id: a}, {id: b}) => a - b).map(direct => (
                        <li key={direct.id}>{direct.step}</li>
                    ))}
                </ol>
            </div>
            <div>
                {editDeleteButton}
                <h2>Category: {currentRecipe.category_name}</h2>
            </div>
        </article>
    )
}
