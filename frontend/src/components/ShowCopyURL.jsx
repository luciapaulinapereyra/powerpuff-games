import React from 'react'

var copied=false;
function cutClipBoard(){
    let url = document.getElementById('text');
    let falseInput = document.createElement('input');
    falseInput.setAttribute("value",url.value);
    document.body.appendChild(falseInput);
    falseInput.select();
    document.execCommand('copy');
    document.body.removeChild(falseInput);
    copied=true;
}

const ShowCopyURL = (props) => {
    return (
        <div>
            <p>Envie este link a su amigue para poder jugar </p>
            <input type="text" id="text"value={`${props.url}${props.roomID}`} readOnly/>
            <button className={props.css} id="copier" onClick={cutClipBoard}>{copied ? "Copiado!" : "Copiar!"}</button>
        </div>
    )
}
export default ShowCopyURL;