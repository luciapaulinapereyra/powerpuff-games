import React, { useState } from "react";

const RulesHangman = () => {
  return (
    <div>
      <h2>¡Bienvenido al ahorcado!</h2>
      <h3>Como jugar: </h3>
      <ul>
        <li>
          Haz click en "Empezar a jugar" y obtendrás una palabra para poder
          adivinar
        </li>
      </ul>
      <h3>Reglas: </h3>
      <ul>
        <li>
          Envia una letra para ver si es correcta, al escribir mas de una letra
          se podrá arriesgar automáticamente una palabra
        </li>
        <li>
          Tienes 7 intentos para adivinar o de lo contrario te ahorcarás :(
        </li>
        <li>Puedes rendirte apretando el botón de rendición</li>
      </ul>
      <b>Si una partida es cancelada o termina, no podrás volver a acceder</b>
    </div>
  );
};

export default RulesHangman;
