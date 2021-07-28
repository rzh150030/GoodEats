const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";
const WIPE_ERROR = "recipe/wipeError";

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
});


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
        const data = await response.json()
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

const initialState = {recipes: {}, currentRecipe: {}}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RECIPE:
            let newRecipeState = {...state};
            newRecipeState.recipes[action.recipe.id] = action.recipe;
            newRecipeState.currentRecipe[action.recipe.id] = action.recipe;
            return newRecipeState;
        case WIPE_ERROR:
            let cleanErrorState = {...state};
            cleanErrorState.errors = action.errors;
            return cleanErrorState;
        default:
            return state;
    }
}
