import React from 'react';
import RecipeForm from "../RecipeForm";

export default function CreateRecipe() {
    const initIngredients = [{id: 0, ingredient: ""}];
    const initDirections = [{id: 0, step: ""}];
    const initName = "";
    const checkWhichMethod = true; //prop for form component to use create recipe thunk

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
