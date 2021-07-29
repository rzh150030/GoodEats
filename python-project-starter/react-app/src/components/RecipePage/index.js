import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getRecipe } from '../../store/recipe';

export default function RecipePage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);

    return (
        <h1>Recipe detail page</h1>
    )
}
