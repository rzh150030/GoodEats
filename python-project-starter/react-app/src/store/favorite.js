const LOAD_FAVORITES = "favorite/loadFavorites";
const FAVOR_RECIPE = "favorite/favorRecipe";
const UNFAVOR_RECIPE = "favorite/unfavorRecipe";



const initialState = {favorites: {}};

export default function favoriteReducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}
