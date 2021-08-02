import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRecipes } from '../../store/recipe';
import { getFavoredRecipes } from '../../store/favorite';

export default function ProfilePage() {
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <span>Your Recipes</span>
                <span>Favorite Recipes</span>
            </div>
        </div>
    )
}
