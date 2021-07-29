import React from 'react';
import GoBack from '../../../components/GoBack'
import '../cssTateti/indexTateti.css'

const MatchWinnerTateti = ({winner}) => {
    let aux; 
    if(winner==0){
        aux="El jugador de las X gano la partida"
    }else if (winner==1) {
        aux="El jugador de las O gano la partida"
    } else if (winner == 2) {
        aux = "Empataron"
    }

    return(
        <div>
            <div className="title"><h1>TERMINO LA PARTIDA</h1></div>
            <div className="title"><h3>{aux}</h3></div>
            <div>
                <GoBack/>
            </div>
        </div>
    )
}

export default MatchWinnerTateti;