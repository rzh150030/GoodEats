import React, { useState } from 'react';
import { createReview, updateReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewForm() {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);
    let updating = false;

    //onChange handler
    const updateInputReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result;
        if (updating) {
            result = await dispatch(updateReview(review, currentRecipe.id));
        }
        else {
            result = await dispatch(createReview(review, currentRecipe.id));
        }

        if (result) {
            setErrors(result);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Review: </label>
            <div>
                <textarea rows="20" cols="80" value={review} onChange={updateInputReview}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
