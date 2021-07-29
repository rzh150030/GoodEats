const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";
const GET_CATEGORIES = "recipe/getCategories";
const UPDATE_RECIPE = "recipe/updateRecipe";

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
});

const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories
})

const loadRecipe = (recipe) => ({
    type: LOAD_RECIPE,
    payload: recipe
})

const loadAllRecipe = (recipes) => ({
    type: LOAD_ALL_RECIPES,
    payload: recipes
})

//thunk for get a recipe
export const getRecipe = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipe(data));
    }
}

//thunk for getting all recipes
export const getAllRecipes = () => async dispatch => {
    const response = await fetch("/api/recipes/all");

    if (response.ok) {
        const data = await response.json();
        dispatch(loadAllRecipe(data));
    }
}

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
        return null;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors)
            return data.errors;
    }
    else {
        return ["An error occurred. Please try again later."];
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
    }
}

//thunk for getting all categories
export const grabCategories = () => async dispatch => {
    const response = await fetch("/api/categories/all");

    if (response.ok) {
        const data = await response.json();
        dispatch(getCategories(data));
    }
}


const initialState = {recipes: {}, currentRecipe: {}, categories: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: {
                  ...state.recipes,
                  [action.recipe.id]: action.recipe
                }
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
        default:
            return state;
    }
}
