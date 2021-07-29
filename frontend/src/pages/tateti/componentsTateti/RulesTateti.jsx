import React, { useState } from "react";

const RulesTateti = () => {
  return (
      <div>
    <h2> Bienvenide al tateti </h2> 
    <h4> Reglas </h4> <br/>
    ─No podrá jugar si no es su turno o si no clikea dentro del trablero 
    ─Una vez haga click adentro del tablero, se marcará su símbolo asignado (<b>X</b> o <b>O</b>) sobre la casilla. <b> Siempre y cuándo esta no tenga ningún otro símbolo</b> <br/>
    ─Ganará quién logre poner tres símbolos en línea (en vertical, horizontal o diagonal)  <br/>
    ─Si quiere rendirse puede apretar el botón con la palabra "Rendirse"  <br/>
    <b>Si una partida es cancelada o termina, la sala será eliminada en un lapso de cuatro horas.</b> <br/>
    </div>
  );
};

export default RulesTateti;
