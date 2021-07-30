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
            <div className="recipe-detail-buttons">
                <button onClick={editRecipe}>Edit</button>
                <button onClick={deletion}>Delete</button>
            </div>
        );
    }

    return (
        <>
            <h1>{currentRecipe.name}</h1>
            <article className="recipe-detail-page">
                <label className="ingred-detail-label">Ingredients: </label>
                <ul className="ingred-detail-list">
                    {currentRecipe.ingredients?.sort(({id: a}, {id: b}) => a - b).map(ingred => (
                        <li key={ingred.id}>{ingred.ingredient}</li>
                    ))}
                </ul>
                <label className="direct-detail-label">Directions: </label>
                <ol className="direct-detail-list">
                    {currentRecipe.directions?.sort(({id: a}, {id: b}) => a - b).map(direct => (
                        <li key={direct.id}>{direct.step}</li>
                    ))}
                </ol>
                {editDeleteButton}
                <h2 className="recipe-detail-category">Category: {currentRecipe.category_name}</h2>

            </article>
        </>
    )
}
