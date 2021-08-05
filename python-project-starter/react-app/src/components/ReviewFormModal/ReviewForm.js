import React, { useState } from 'react';
import { createReview, updateReview } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewForm() {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    let updating = false;

    //onChange handler
    const updateComment = (e) => setComment(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        
    };


    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Review: </label>
            <div>
                <textarea rows="20" cols="80" value={comment} onChange={updateComment}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
