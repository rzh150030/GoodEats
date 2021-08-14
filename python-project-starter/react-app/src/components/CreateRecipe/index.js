import React from 'react';
import RecipeForm from "../RecipeForm";

export default function CreateRecipe() {
    const initIngredients = [{id: 0, ingredient: ""}];
    const initDirections = [{id: 0, step: ""}];
    const initName = "";
    const categoryName = "Ainu";
    const checkWhichMethod = true; //prop for form component to use create recipe thunk

    return (
        <>
            <RecipeForm
            categoryName={categoryName}
            initIngredients={initIngredients}
            initDirections={initDirections}
            initName={initName}
            checkWhichMethod={checkWhichMethod}
            />
        </>
    )
}
