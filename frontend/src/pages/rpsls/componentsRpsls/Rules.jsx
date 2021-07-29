import React from 'react';
const Rules = () => {
    return(
        <div>
            <h2><b style={{color:"#F2D70F"}}>Bienvenidos al piedra,papel,tijera,lagarto,spock!</b></h2>
            <h3>Como jugar: </h3>
            <ul>
                <li>Haga click en crearSala para crear una nueva sala y envie el link a su amigue.</li>
                <li>Si una persona le envio el link, ponganlo en su navegador para entrar a la sala.</li>
            </ul>
            <h3>Reglas: </h3>
            <ul>
                <li>Haga click en la imagen con el movimiento que quiera realizar</li>
                <li>Espere a que su contrincante elija su jugada</li>
                <li>El primero que haga 5 puntos gana la partida</li>
                <li>Para rendirse apriete el boton RENDIRSE, este cancelara la partida y lo mandara al lobby</li>
            </ul>
            <h3>¿Quien le gana a quien?</h3>
            <ul>
                <li><b style={{color:"#F2D70F"}}>Roca</b> le gana a Lagarto y a Tijera</li>
                <li><b style={{color:"#F2D70F"}}>Papel</b> le gana a Roca y a Spock</li>
                <li><b style={{color:"#F2D70F"}}>Tijera</b> le gana a Papel y a Lagarto</li>
                <li><b style={{color:"#F2D70F"}}>Lagarto</b> le gana a Spock y a Papel</li>
                <li><b style={{color:"#F2D70F"}}>Spock</b> le gan a Tijera y a Roca</li>
            </ul>
            <b>Si una partida es cancelada o terminada, la sala será eliminada en un lapso de cuatro horas.</b>
        </div>
    )
}

export default Rules;