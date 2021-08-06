import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/review';
import ReviewFormModal from '../ReviewFormModal';

export default function ReviewSection() {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const recipeReviews = useSelector(state => Object.values(state.recipeReviews.reviews));
    const [errors, setErrors] = useState([]);
    let userReview;
    if (sessionUser) {
        userReview = recipeReviews.find(review => sessionUser.id === review.user_id);
    }

    //Onclick event handlers
    const deleteUserReview = async (e) => {
        e.preventDefault();

        const result = await dispatch(deleteReview(userReview.id));

        if (result) {
            setErrors(result);
        }
    }
    const editUserReview = async (e) => {
        e.preventDefault();

        
    }

    const editDeleteReview = (
        <div>
            <button onClick={editUserReview}>Edit</button>
            <button onClick={deleteUserReview}>Delete</button>
        </div>
    )


    return (
        <div>
            <ul className="errors">
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
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
