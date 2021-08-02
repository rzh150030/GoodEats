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

    const favor = async (e) => {
        e.preventDefault();

        let resultErrors = await dispatch(favorRecipe(currentRecipe.id));

        
    };

    return (
        <></>
    )
}
