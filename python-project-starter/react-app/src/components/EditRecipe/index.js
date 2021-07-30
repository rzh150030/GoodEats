import React, {} from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import RecipeForm from "../RecipeForm";

export default function EditRecipe() {
    const {id} = useParams();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const initIngredients = currentRecipe.ingredients;
    const initDirections = currentRecipe.directions;
    const initName = currentRecipe.name;
    const checkWhichMethod = false; // prop for form component

    if (!currentRecipe.id) return <Redirect to={`/recipe/detail/${id}`} />

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
