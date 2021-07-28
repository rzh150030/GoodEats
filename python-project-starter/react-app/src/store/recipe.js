const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";
const GET_CATEGORIES = "recipe/getCategories"

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
});

const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories
})


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
            let newRecipeState = {...state};
            newRecipeState.recipes[action.recipe.id] = action.recipe;
            newRecipeState.currentRecipe[action.recipe.id] = action.recipe;
            return newRecipeState;
        case GET_CATEGORIES:
            let stateWithCat = {...state};
            action.payload.categories.forEach(category => {
                stateWithCat.categories[category.name] = category
            });
            return stateWithCat;
        default:
            return state;
    }
}
