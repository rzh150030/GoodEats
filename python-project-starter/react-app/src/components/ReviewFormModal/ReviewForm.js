import React, { useState } from 'react';
import { createReview, updateReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewForm({setShowModal}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);
    let updating = false;

    //onChange handler
    const updateReview = (e) => setReview(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result;

        if (updating) {
            result = await dispatch(updateReview(review));
        }
        else {
            result = await dispatch(createReview(review));
        }

        if (result.errors) {
            setErrors(result.errors);
        }
        else {
            setShowModal(false);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Review: </label>
            <div>
                <textarea rows="20" cols="80" value={review} onChange={updateReview}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
