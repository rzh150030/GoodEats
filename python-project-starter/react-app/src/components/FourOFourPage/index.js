import React from 'react';
import { NavLink } from 'react-router-dom';
import altonBrown from "../../images/altonbrownimage.jpg";
import "./FourOFourPage.css";

export default function FourOFourPage() {
    return (
        <div id="not-found-page">
            <img src={altonBrown} alt="Alton Brown"/>
            <div id="not-found-page-content">
                <span id="page-message">Page not found</span>
                <NavLink to="/" id="">Click here to return to home</NavLink>
            </div>
        </div>
    )
}
