import React, { useState } from 'react';
import { postRecipe, updateRecipe } from '../../store/recipe';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import "./RecipeForm.css";

export default function RecipeForm(props) {
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const categories = useSelector(state => Object.values(state.recipe.categories));
    const submitCat = useSelector(state => state.recipe.categories); //submit category id for backend
    const [category, setCategory] = useState("Ainu"); //key into submitCat
    const [name, setName] = useState(props.initName);
    const [ingredients, setIngredients] = useState(props.initIngredients);
    const [directions, setDirections] = useState(props.initDirections);
    const [errors, setErrors] = useState([]);
    let creatingRecipe = props.checkWhichMethod; //check if updating or creating recipe

    //onChange event handlers
    //ingredients and directions are array of objects
    // - to update them extract object from array and change the value at the key and splice back into a new array
    const addName = (e) => setName(e.target.value);
    const addIngred = (e, i) => {
        let newIngred = ingredients[i];
        newIngred.ingredient = e.target.value;
        const newArr = [...ingredients];
        newArr.splice(i, 1, newIngred);
        setIngredients(newArr);
    };
    const deleteIngred = (e, i) => {
        e.preventDefault();

        if (ingredients.length > 1) {
            const newArr = [...ingredients];
            newArr.splice(i, 1);
            setIngredients(newArr);
        }
        else {
            setErrors(["Must have at least 1 ingredient"]);
        }
    };
    const addDirect = (e, i) => {
        let newDirect = directions[i];
        newDirect.step = e.target.value;
        const newArr = [...directions];
        newArr.splice(i, 1, newDirect);
        setDirections(newArr);
    };
    const deleteDirect = (e, i) => {
        e.preventDefault();

        if (directions.length > 1) {
            const newArr = [...directions];
            newArr.splice(i, 1);
            setDirections(newArr);
        }
        else {
            setErrors(["Must have at least 1 step"]);
        }
    };
    const addCat = (e) => setCategory(e.target.value);

    //add new input for ingredient and direction
    const newIngredInput = (e) => {
        e.preventDefault();

        setIngredients([...ingredients, {id: 0, ingredient: ""}]);
    };
    const newDirectInput = (e) => {
        e.preventDefault();

        setDirections([...directions, {id: 0, step: ""}]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            category: submitCat[category].id,
            ingredients,
            directions
        };

        let result;
        if (creatingRecipe) {
            result = await dispatch(postRecipe(data));
        }
        else {
            result = await dispatch(updateRecipe(data, id))
        }

        if (result.errors) {
            setErrors(result.errors);
        }
        else {
            history.push(`/recipe/detail/${result}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <ul className="errors">
                {errors && errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
            <label className="recipe-form-labels">Name: </label>
            <input type="text" value={name} onChange={addName} required/>
            <label className="recipe-form-labels">Category: </label>
            <select value={category} onChange={addCat} className="category-select">
                {categories?.map(cat => (
                    <option key={cat.id}>{cat.name}</option>
                ))}
            </select>
            <div className="dynamic-input-containers">
                <label className="recipe-form-labels">Ingredients: </label>
                {ingredients?.map((ingred, i) => (
                <div key={i}>
                    <input type="text" value={ingred.ingredient} onChange={(e) => addIngred(e, i)} className="input-ingred" required/>
                    <button onClick={(e) => deleteIngred(e, i)} className="delete-input-button">Delete</button>
                </div>
            ))}
                <button onClick={newIngredInput} className="add-input-button">One More Ingredient</button>
            </div>
            <div className="dynamic-input-containers">
                <label className="recipe-form-labels">Directions: </label>
                {directions?.map((direct, i) => (
                <div key={i}>
                    <input type="text" value={direct.step} onChange={(e) => addDirect(e, i)} className="input-direct" required/>
                    <button onClick={(e) => deleteDirect(e, i)} className="delete-input-button">Delete</button>
                </div>
                ))}
                <button onClick={newDirectInput} className="add-input-button">One More Step</button>
            </div>
            <button type="submit" className="save-recipe-button">Save Recipe</button>
        </form>
    )
}
