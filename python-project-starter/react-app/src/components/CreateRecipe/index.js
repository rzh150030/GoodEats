import React, { useState } from 'react';
import { postRecipe } from '../../store/recipe';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function CreateRecipe() {
    const history = useHistory();
    const dispatch = useDispatch();
    //const categories = useSelector(state => state.recipe.categories);
    //const [category, setCategory] = useState("")

    return (
        <h1>Insert form</h1>
    )
}
