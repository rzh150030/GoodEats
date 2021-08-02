import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { favorRecipe, unfavorRecipe, getFavoredRecipes } from '../../store/favorite';

export default function FavoriteButton() {
    const dispatch = useDispatch();
    const currentRecipe = useSelector(state => state.recipe.currentRecipe);
    const sessionUser = useSelector(state => state.session.user);
    const userFavorites = useSelector(state => state.favoriteRecipe.favorites);
    const [errors, setErrors] = useState([]);
    let favorited;
    if (sessionUser) { //check if user already favorited current recipe
        favorited = userFavorites.find(recipe => recipe.id === currentRecipe.id);
    }

    useEffect(() => {
        if (sessionUser) dispatch(getFavoredRecipes(sessionUser.id)); //get logged user's favorites to determine which button to show
    }, [dispatch, sessionUser]);

    //Onclick event handlers
    const favor = async (e) => {
        e.preventDefault();

        let resultErrors = await dispatch(favorRecipe(currentRecipe.id));

        if (resultErrors) {
            setErrors(resultErrors);
        }
    };

    const unfavor = async (e) => {
        e.preventDefault();

        let resultErrors = await dispatch(unfavorRecipe(currentRecipe.id));

        if (resultErrors) {
            setErrors(resultErrors);
        }
    }

    let favorButton;
    if (sessionUser && !favorited && sessionUser.id === currentRecipe.user_id) {
        favorButton = <button onClick={favor}>Favorite</button>
    }
    else if (sessionUser && favorited && sessionUser.id === currentRecipe.user_id) {
        favorButton = <button onClick={unfavor}>Unfavorite</button>
    }


    return (
        <></>
    )
}
