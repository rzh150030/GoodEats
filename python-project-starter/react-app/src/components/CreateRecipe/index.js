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
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [directions, setDirections] = useState([{step: ""}]);
    const [errors, setErrors] = useState([]);

    //onChange event handlers
    const addName = (e) => setName(e.target.value);
    const addIngred = (e, i) => {
        let newIngred = ingredients[i];
        newIngred.ingredient = e.target.value;
        const newArr = [...ingredients];
        newArr.splice(i, 1, newIngred);
        setIngredients(newArr);
    }
    const deleteIngred= (e, i) => {
        e.preventDefault()

        const newArr = [...ingredients];
        newArr.splice(i, 1);
        setIngredients(newArr);
    }

    //add new input for ingredient
    const newIngredInput = (e) => {
        e.preventDefault()

        setIngredients([...ingredients, {ingredient: ""}]);
    }

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
        <form onSubmit={handleSubmit}>
            <ul>
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Name: </label>
            <input type="text" value={name} onChange={addName} required/>
            <label>Ingredients: </label>
            {ingredients.map((ingred, i) => (
                <div key={i}>
                    <input type="text" value={ingred} onChange={(e) => addIngred(e, i)} required/>
                    <div>
                        <button onClick={(e) => deleteIngred(e, i)}>Delete</button>
                    </div>
                </div>
            ))}
            <button onClick={newIngredInput}>One More Ingredient</button>
        </form>
    )
}
