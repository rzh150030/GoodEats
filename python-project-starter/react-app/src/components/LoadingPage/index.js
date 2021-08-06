import React from 'react';
import "./LoadingPage.css";

export default function LoadingPage() {
    return (
        <div id="load-page">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            <div>
                <h1 id="load-text">Loading...</h1>
            </div>
        </div>
    )
}
