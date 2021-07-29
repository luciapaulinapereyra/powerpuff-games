import React from "react";
import { Link } from "react-router-dom";
import Background from "./Background";
import "./css/background.css";

const Lobby = () => {
  return (
    <div id="lobby">
      <h1 class="titleLobby">BIENVENIDES AL LOBBY :)</h1>
      <div className="container-etiquetas">
        {" "}
        <Link to="/hangman" className="etiquetas">
          Ahorcado
        </Link>
        <br />
        <Link to="/tateti" className="etiquetas">
          Tateti
        </Link>
        <br />
        <Link to="/rpsls" className="etiquetas">
          Piedra,Papel,Tijera,Lagarto,Spock
        </Link>
        <br />
        <Link to="/paint" className="etiquetas">
          Paint
        </Link>
        <br />
        <Link to="/funZone" className="etiquetas">
          FunZone!!1!
        </Link>
        <div className="center">
          <Background />
        </div>
      </div>
      <h2 id="grupo">Grupo 13</h2>
    </div>
  );
};

export default Lobby;
