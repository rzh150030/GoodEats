import React from 'react';
import "./LoadingPage.css";

export default function LoadingPage() {
    return (
        <div id="load-page">
            <div id="load-spinner"/>
            <div>
                <h1 id="load-text">Loading...</h1>
            </div>
        </div>
    )
}