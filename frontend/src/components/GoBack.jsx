import React from 'react'

function GoBack(props){
    async function back(){
        window.location.href = "http://localhost:3000/"
    }
    return (
        <div>
            <button className={props.css} onClick={back}>Volver al Lobby</button>
        </div>
    )
}
export default GoBack;