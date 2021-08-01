const LOAD_FAVORITES = "favorite/loadFavorites";
const FAVOR_RECIPE = "favorite/favorRecipe";
const UNFAVOR_RECIPE = "favorite/unfavorRecipe";

const makeFavor = (updatedFavors) => ({
    type: FAVOR_RECIPE,
    updatedFavors
});

const deleteFavor = (updatedFavors) => ({
    type: UNFAVOR_RECIPE,
    updatedFavors
});

//thunk for favoriting a recipe
export const favorRecipe = (recipeId) => async dispatch => {
    const response = await fetch(`/api/favorites/favor/${recipeId}`, {
        method: "POST"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(makeFavor(data));
        return null;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
    else {
        return ['An error occurred. Please try again later.'];
    }
};

const initialState = {favorites: {}};

export default function favoriteReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
