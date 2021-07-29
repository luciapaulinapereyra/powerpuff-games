import React from 'react';
import GoBack from '../../../components/GoBack'
import '../css/indexRpsls.css'
import Background from './RpslsBackground'
const MatchCanceled = () => {
    return(
        <div>
            <div className="title"><h1>El otro jugador se ha rendido!</h1></div>
            <div className="title"><h2>GANASTE!!</h2></div>
            <div className="boxRpsls">
                <GoBack css={"button"}/>
            </div>
            <div className="RpslsBackground"><Background /></div>
        </div>
    )
}

export default MatchCanceled;