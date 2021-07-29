import React from 'react';
import GoBack from '../../../components/GoBack'
import '../css/indexRpsls.css'
import Background from './RpslsBackground'

const MatchWinner = ({matchWinner}) => {
    let winner;
    if(matchWinner==0){
        winner="El jugador 1 gano la partida"
    }else{
        winner="El jugador 2 gano la partida"
    }
    return(
        <div>
            <div className="title"><h1>TERMINO LA PARTIDA!</h1></div>
            <div className="title"><h3>{winner}</h3></div>
            <div className="boxRpsls">
                <GoBack css={"button"}/>
            </div>
            <div className="RpslsBackground"><Background /></div>
        </div>
    )
}

export default MatchWinner;