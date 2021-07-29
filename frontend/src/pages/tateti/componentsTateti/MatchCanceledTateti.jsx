import React from 'react';
import GoBack from '../../../components/GoBack'
import '../cssTateti/indexTateti.css'

const MatchCanceledTateti = () => {
    return(
        <div>
            <div className="title"><h1>El otro jugador se ha rendido</h1></div>
            <div className="title"><h2>GANASTE</h2></div>
            <div>
                <GoBack/>
            </div>
        </div>
    )
}

export default MatchCanceledTateti
;