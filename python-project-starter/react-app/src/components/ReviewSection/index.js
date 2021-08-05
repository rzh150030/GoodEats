import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadReviews, deleteReview } from '../../store/review';
import ReviewFormModal from '../ReviewFormModal';

export default function ReviewSection() {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const recipeReviews = useSelector(state => Object.values(state.recipeReviews.reviews));
    const userReview = recipeReviews.find(review => sessionUser.id === review.user_id);

    //Onclick event handlers
    const deleteUserReview = (e) => {
        e.preventDefault();

        console.log("FFFFFFF")
        console.log(userReview.id)
        console.log(typeof userReview.id)
        dispatch(deleteReview(userReview.id));
    }

    const editDeleteReview = (
        <div>
            <button>Edit</button>
            <button onClick={deleteUserReview}>Delete</button>
        </div>
    )


    return (
        <div>
            <h2>Reviews</h2>
            {sessionUser && sessionUser.id !== currentRecipe.user_id && !userReview && <ReviewFormModal />}
            {recipeReviews?.sort(({id: a}, {id: b}) => a - b).map(rev => (
                <article key={rev.id}>
                    <div>{rev.review}</div>
                    {sessionUser && sessionUser.id === rev.user_id && editDeleteReview}
                </article>
            ))}
        </div>
    )
}
