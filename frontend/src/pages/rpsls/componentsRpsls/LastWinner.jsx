import React from 'react';
const LastWinner = ({lastWinner}) => {
    let winner;
    switch(lastWinner){
        case -2: winner="";
        break;
        case -1: winner="Empate!"
        break;
        case 0: winner="Esta ronda la gano el jugador 1"
        break;
        case 1: winner="Esta ronda la gano el jugador 2"
    }
    return(
        <div>
            <h3>{winner}</h3>
        </div>
    )
}

export default LastWinner;