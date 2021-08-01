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

const initialState = {favorites: {}};

export default function favoriteReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
