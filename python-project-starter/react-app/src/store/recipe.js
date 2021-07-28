const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";
const HANDLE_ERROR = "recipe/handleError";

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
});

const makeError = (errors) => ({
    type: HANDLE_ERROR,
    errors
})


//thunk for creating a new recipe
export const postRecipe = (data) => async dispatch => {
    const response = await fetch("/api/recipes/create", {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(makeRecipe(data));
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors)
            dispatch(makeError(data.errors));
    }
    else {
        dispatch(makeError(["An error occurred. Please try again later."]));
    }
};



const initialState = {recipes: {}, currentRecipe: {}, errors: []}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_RECIPE:
            let newRecipeState = {...state};
            newRecipeState.recipes[action.recipe.id] = action.recipe;
            newRecipeState.currentRecipe[action.recipe.id] = action.recipe;
            return newRecipeState;
        case HANDLE_ERROR:
            let newErrorsState = {...state};
            newErrorsState.errors = []; //reset errors in array
            newErrorsState.errors.concat(action.errors)
            return newErrorsState;
        default:
            return state;
    }
}
