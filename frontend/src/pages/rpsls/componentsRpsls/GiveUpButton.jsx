import React from 'react'
import '../css/indexRpsls.css'

function GiveUpButton({giveUp}){
    async function backAndGiveUp(){
        giveUp();
        alert("Usted se rendira y volvera al lobby");
        window.location.href = "http://localhost:3000/" //redirect to the lobby
    }
    return (
        <div>
            <button className="button"onClick={backAndGiveUp}>Rendirse</button>
        </div>
    )
}
export default GiveUpButton;