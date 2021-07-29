import React, {} from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import RecipeForm from "../RecipeForm";

export default function EditRecipe() {
    const history = useHistory();
    const {id} = useParams();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const initIngredients = currentRecipe.ingredients;
    const initDirections = currentRecipe.directions;
    const initName = currentRecipe.name;
    const checkWhichMethod = false; // prop for form component

    if (!currentRecipe.id) history.push(`/recipe/detail/${id}`);
    console.log(currentRecipe)

    return (
        <>
            <RecipeForm
            initIngredients={initIngredients}
            initDirections={initDirections}
            initName={initName}
            checkWhichMethod={checkWhichMethod}
            />
        </>
    )
}
