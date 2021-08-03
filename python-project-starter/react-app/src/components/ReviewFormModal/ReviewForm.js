import React, { useState } from 'react';
import { createReview, updateReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewForm() {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    let updating = false;

    const handleSubmit = (e) => {

    };

    let commentInput;


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Comment:</label>
            <button type="submit">Submit</button>
        </form>
    )
}
