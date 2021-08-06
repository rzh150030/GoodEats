import React, { useState } from 'react';
import { createReview, updateReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import "./ReviewForm.css";

export default function ReviewForm({updateState, initReview, reviewId, setShowModal}) {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const [review, setReview] = useState(initReview); //get initreview from review section
    const [errors, setErrors] = useState([]);
    let updating = updateState; //get state from review section

    //onChange handler
    const updateInputReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result;
        if (updating) {
            result = await dispatch(updateReview(review, reviewId));
        }
        else {
            result = await dispatch(createReview(review, currentRecipe.id));
        }

        if (result) {
            setErrors(result);
        }
        else if (setShowModal) {
            setShowModal(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="review-form">
            <label id="review-form-label">Review</label>
            <ul className="errors">
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <div id="review-input-container">
                <textarea rows="5" cols="80" value={review} onChange={updateInputReview}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
