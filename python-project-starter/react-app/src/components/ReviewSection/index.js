import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadReviews, deleteReview } from '../../store/review';
import ReviewFormModal from '../ReviewFormModal';

export default function ReviewSection() {

    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const recipeReviews = useSelector(state => Object.values(state.recipeReviews.reviews));
    const user_idReviews = recipeReviews.map(review => review.user_id);
    const alreadyReviewed = user_idReviews.includes(sessionUser.id);


    //Onclick event handlers

    const editDeleteReview = (
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )

    return (
        <div>
            <h2>Reviews</h2>
            {sessionUser && sessionUser.id !== currentRecipe.user_id && !alreadyReviewed && <ReviewFormModal />}
            {recipeReviews?.sort(({id: a}, {id: b}) => a - b).map(rev => (
                <article key={rev.id}>
                    <div>{rev.review}</div>
                    {sessionUser && sessionUser.id === rev.user_id && editDeleteReview}
                </article>
            ))}
        </div>
    )
}
