import React, { useState } from 'react';
import { postRecipe } from '../../store/recipe';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function CreateRecipe() {
    const history = useHistory();
    const dispatch = useDispatch();
    //const categories = useSelector(state => state.recipe.categories);
    //const [category, setCategory] = useState("Ainu");
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const [errors, setErrors] = useState([]);

    //onChange event handlers

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name,
            category: 1,
            ingredients,
            directions
        };

        try {
            dispatch(postRecipe(data));
            history.push("/");
        } catch (error) {
            const badData = useSelector(state => state.recipes.errors)
            setErrors(badData);
        }

    }

    return (
        <form>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>

        </form>
    )
}
