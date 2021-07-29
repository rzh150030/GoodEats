import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import RecipeForm from "../RecipeForm";

export default function EditRecipe() {
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const initIngredients = currentRecipe.ingredients;
    const initDirections = currentRecipe.directions;
    const initName = currentRecipe.name;
    const checkWhichMethod = false; // prop for form component

    

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
