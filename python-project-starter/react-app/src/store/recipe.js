const LOAD_RECIPE = "recipe/loadOneRecipe";
const LOAD_ALL_RECIPES = "recipe/loadRecipes";
const CREATE_RECIPE = "recipe/createRecipe";

const makeRecipe = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
})

//thunk for creating a new recipe
export const postRecipe = (data) => async dispatch => {
    const response = await fetch("/api/recipes/create", {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const data = await response.json()
        dispatch()
    }
};
