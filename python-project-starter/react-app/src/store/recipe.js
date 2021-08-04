const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";
const GET_CATEGORIES = "recipe/getCategories";
const UPDATE_RECIPE = "recipe/updateRecipe";
const DELETE_RECIPE = "recipe/deleteRecipe";
const USER_RECIPES = "recipe/loadUserRecipes";

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    payload: recipe
});

const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories
});

const loadRecipe = (recipe) => ({
    type: LOAD_RECIPE,
    payload: recipe
});

const loadAllRecipe = (recipes) => ({
    type: LOAD_ALL_RECIPES,
    payload: recipes
});

const patchRecipe = (newRecipe) => ({
    type: UPDATE_RECIPE,
    payload: newRecipe
});

const destroyRecipe = (deleteId) => ({
    type: DELETE_RECIPE,
    deleteId // finds which recipe to remove from state
});

const loadUserRecipes = (userRecipesData) => ({
    type: USER_RECIPES,
    payload: userRecipesData
});

//thunk for get a recipe
export const getRecipe = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipe(data));
    }
};

//thunk for getting all recipes
export const getAllRecipes = () => async dispatch => {
    const response = await fetch("/api/recipes/all");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllRecipe(data));
    }
};

//thunk for creating a new recipe
export const postRecipe = (data) => async dispatch => {
    const response = await fetch("/api/recipes/create", {
        headers: {
            "CONTENT-TYPE": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(makeRecipe(data));
        return data.id; //used to redirect to recipe detail page
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors)
            return data;
    }
    else {
        return {errors: ["An error occurred. Please try again later."]};
    }
};

//thunk for updating a recipe
export const updateRecipe = (data, recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/edit/${recipeId}`, {
        method: "PATCH",
        headers: {
            "CONTENT-TYPE": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(patchRecipe(data));
        return data.id;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors)
            return data.errors;
    }
    else {
        return {errors: ["An error occurred. Please try again later."]};
    }
};

//thunk for getting all categories
export const grabCategories = () => async dispatch => {
    const response = await fetch("/api/categories/all");

    if (response.ok) {
        const data = await response.json();
        dispatch(getCategories(data));
    }
};

//thunk for deleting a recipe
export const deleteRecipe = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroyRecipe(recipeId));
        return data;
    }
};

//thunk for getting user's recipes
export const userRecipes = (userId) => async dispatch => {
    const response = await fetch(`/api/recipes/user/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserRecipes(data));
    }
};

const initialState = {recipes: [], currentRecipe: {}, categories: {}, userRecipes: {}};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: [
                  ...state.recipes,
                    action.payload
                ]
              }
        case GET_CATEGORIES:
            let stateWithCat = {...state};
            action.payload.categories.forEach(category => {
                stateWithCat.categories[category.name] = category
            });
            return stateWithCat;
        case LOAD_RECIPE:
            return {...state, currentRecipe: action.payload};
        case LOAD_ALL_RECIPES:
            return {...state, recipes: action.payload.recipes};
        case UPDATE_RECIPE:
            return {...state, currentRecipe: action.payload};
        case DELETE_RECIPE:
            let newDeleteState = {...state, currentRecipe: {}, recipes: [...state.recipes]}
            for (let i = 0; i < newDeleteState.recipes.length; i++) { //hack solution to get rid of deleteId item from state.recipes
                if (newDeleteState.recipes[i].id === action.deleteId) {
                    newDeleteState.recipes.splice(i, 1);
                    return newDeleteState;
                }
            }
            break;
        case USER_RECIPES:
            let userRecipesState = {...state, userRecipes: {}};
            action.payload.recipes.forEach(recipe => {
                userRecipesState.userRecipes[recipe.id] = recipe;
            });
            return userRecipesState;
        default:
            return state;
    }
}
