import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { favorRecipe, unfavorRecipe } from '../../store/favorite';
import "./FavoriteButton.css";


export default function FavoriteButton(props) {
    const dispatch = useDispatch();
    const currentRecipe = props.currentRecipe;
    const sessionUser = props.sessionUser;
    const favorited = props.favorited;
    const [errors, setErrors] = useState([]);

    //Onclick event handlers
    const favor = async (e) => {
        e.preventDefault();

        let resultErrors = await dispatch(favorRecipe(currentRecipe.id));

        if (resultErrors) {
            setErrors(resultErrors);
        }
    };

    const unfavor = async (e) => {
        e.preventDefault();

        let resultErrors = await dispatch(unfavorRecipe(currentRecipe.id));

        if (resultErrors) {
            setErrors(resultErrors);
        }
    }

    let favorButton;
    if (sessionUser && !favorited && sessionUser.id !== currentRecipe.user_id) {
        favorButton = <button onClick={favor}>Favorite</button>
    }
    else if (sessionUser && favorited && sessionUser.id !== currentRecipe.user_id) {
        favorButton = <button onClick={unfavor}>Unfavorite</button>
    }

    return (
        <div className="recipe-detail-buttons">
            <ul className="errors">
                    {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            {favorButton}
        </div>
    )
}
