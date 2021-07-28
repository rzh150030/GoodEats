import React, { useState, useEffect } from 'react';
import { postRecipe, wipeErrors } from '../../store/recipe';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function CreateRecipe() {
    const history = useHistory();
    const dispatch = useDispatch();
    //const categories = useSelector(state => state.recipe.categories);
    //const [category, setCategory] = useState("Ainu");
    const stateErrors = useSelector(state => state.recipe.errors)
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([{ingredient: ""}]);
    const [directions, setDirections] = useState([{step: ""}]);

    //clear out any errors in store
    useEffect(() => {
        dispatch(wipeErrors());
    }, []);

    //onChange event handlers
    const addName = (e) => setName(e.target.value);
    const addIngred = (e, i) => {
        let newIngred = ingredients[i];
        newIngred.ingredient = e.target.value;
        const newArr = [...ingredients];
        newArr.splice(i, 1, newIngred);
        setIngredients(newArr);
    }
    const deleteIngred = (e, i) => {
        e.preventDefault();

        const newArr = [...ingredients];
        newArr.splice(i, 1);
        setIngredients(newArr);
    }
    const addDirect = (e, i) => {
        let newDirect = directions[i];
        newDirect.step = e.target.value;
        const newArr = [...directions];
        newArr.splice(i, 1, newDirect);
        setDirections(newArr);
    }
    const deleteDirect = (e, i) => {
        e.preventDefault();

        const newArr = [...directions];
        newArr.splice(i, 1);
        setDirections(newArr);
    }

    //add new input for ingredient and direction
    const newIngredInput = (e) => {
        e.preventDefault();

        setIngredients([...ingredients, {ingredient: ""}]);
    }
    const newDirectInput = (e) => {
        e.preventDefault();

        setDirections([...directions, {step: ""}]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name,
            category: 1,
            ingredients,
            directions
        };

        dispatch(postRecipe(data));
        if (!stateErrors.length)
            history.push("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {stateErrors && stateErrors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label>Name: </label>
            <input type="text" value={name} onChange={addName} required/>
            <div>
                <label>Ingredients: </label>
                {ingredients.map((ingred, i) => (
                <div key={i}>
                    <input type="text" value={ingred.ingredient} onChange={(e) => addIngred(e, i)} required/>
                    <div>
                        <button onClick={(e) => deleteIngred(e, i)}>Delete</button>
                    </div>
                </div>
            ))}
                <button onClick={newIngredInput}>One More Ingredient</button>
            </div>
            <div>
                <label>Directions: </label>
                {directions.map((direct, i) => (
                <div key={i}>
                    <input type="text" value={direct.step} onChange={(e) => addDirect(e, i)} required/>
                    <div>
                        <button onClick={(e) => deleteDirect(e, i)}>Delete</button>
                    </div>
                </div>
                ))}
                <button onClick={newDirectInput}>One More Step</button>
            </div>
            <button type="submit">Save Recipe</button>
        </form>
    )
}
