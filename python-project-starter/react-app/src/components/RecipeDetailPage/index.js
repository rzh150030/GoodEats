import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../../store/recipe';
import { getFavoredRecipes } from '../../store/favorite';
import { loadReviews } from '../../store/review';
import FavoriteButton from '../FavoriteButton';
import ReviewSection from '../ReviewSection';
import FourOFourPage from '../FourOFourPage';
import "./RecipeDetailPage.css";

export default function RecipeDetailPage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const userFavorites = useSelector(state => state.favoriteRecipe.favorites);
    let favorited;
    if (sessionUser) { //check if user already favorited current recipe
        favorited = userFavorites.find(recipe => recipe.id === currentRecipe.id);
    }

    useEffect(() => { //fetch recipe from database
        dispatch(getRecipe(id));
        dispatch(loadReviews(id));
        if (sessionUser) dispatch(getFavoredRecipes(sessionUser.id)); //get logged user's favorites to determine which button to show
    }, [dispatch, id, sessionUser]);

    const editRecipe = () => {
        history.push(`/recipe/edit/${currentRecipe.id}`);
    };

    const deletion = async () => {
        let deleted = await dispatch(deleteRecipe(currentRecipe.id));

        if (deleted) history.push("/");
    };

    let editDeleteButton;
    if (sessionUser && sessionUser.id === currentRecipe.user_id) {
        editDeleteButton = (
            <div className="recipe-detail-buttons">
                <button onClick={editRecipe} id="edit-button">Edit</button>
                <button onClick={deletion} id="delete-button">Delete</button>
            </div>
        );
    }

    return (currentRecipe.id ?
        <div id="recipe-detail-page">
            <h1 id="current-recipe-name">{currentRecipe.name}</h1>
            <article className="recipe-article">
                <label className="ingred-detail-label">Ingredients: </label>
                <ul className="ingred-detail-list">
                    {currentRecipe.ingredients?.sort(({id: a}, {id: b}) => a - b).map(ingred => (
                        <li key={ingred.id} className="ingredients">{ingred.ingredient}</li>
                    ))}
                </ul>
                <label className="direct-detail-label">Directions: </label>
                <ol className="direct-detail-list">
                    {currentRecipe.directions?.sort(({id: a}, {id: b}) => a - b).map(direct => (
                        <li key={direct.id} className="steps">{direct.step}</li>
                    ))}
                </ol>
                {editDeleteButton}
                <FavoriteButton favorited={favorited} currentRecipe={currentRecipe} sessionUser={sessionUser}/>
                <h2 className="recipe-detail-category">Category: {currentRecipe.category_name}</h2>
            </article>
            <ReviewSection />
        </div> :
        <FourOFourPage />
    )
}
