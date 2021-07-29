import React from "react";
import "../css/indexHangman.css";
const WrongLetters = ({ wrongLettersArray }) => {
  return (
    <div id="wrong-letters">
      <h1 className="titleLetters">Letras incorrectas:</h1>
      {wrongLettersArray.map((letter, i) => (
        <div key={i} className="letter">
          <p>{letter}</p>
        </div>
      ))}
    </div>
  );
};

export default WrongLetters;
