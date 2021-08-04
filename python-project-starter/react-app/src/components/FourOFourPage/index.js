import React from 'react';
import { NavLink } from 'react-router-dom';
import altonBrown from "../../images/altonbrownimage.jpg";

export default function FourOFourPage() {
    return (
        <div id="not-found-page">
            <img src={altonBrown} alt="Alton Brown"/>
            <span>Page not found</span>
            <NavLink to="/">Click here to return to home</NavLink>
        </div>
    )
}
