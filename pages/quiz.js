import React, { useState } from 'react';

export default function QuizPage(){
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let name = urlParams.get("name");
    
    return (
        <div style={{color: 'red'}}>
            Olá {name}
            <br />
            <br />
            <button onClick={function(){window.history.go(-1)}}>
                Voltar
            </button>

        </div>
    );
}