import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadReviews, deleteReview } from '../../store/review';
import CommentFormModal from '../CommentFormModal';

export default function ReviewSection() {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const recipeReviews = useSelector(state => Object.values(state.recipeReviews.reviews));

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
            <CommentFormModal />
            {recipeReviews?.sort(({id: a}, {id: b}) => a - b).map(rev => (
                <article key={rev.id}>
                    <div>{rev.review}</div>
                    {/* {sessionUser && sessionUser.id === rev.user_id && editDeleteReview} */}
                </article>
            ))}
        </div>
    )
}
