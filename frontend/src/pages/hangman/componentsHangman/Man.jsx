import React, { useState } from "react";
import bow from "../imgHangman/hangman0.png";
import head from "../imgHangman/hangman1.png";
import bodyMan from "../imgHangman/hangman2.png";
import armOne from "../imgHangman/hangman3.png";
import armTwo from "../imgHangman/hangman4.png";
import legOne from "../imgHangman/hangman5.png";
import legTwo from "../imgHangman/hangman6.png";
import deadMan from "../imgHangman/hangman7.png";
import "../css/indexHangman.css";
function Man({ tries }) {
  let img;
  switch (tries) {
    case 0:
      img = bow;
      break;
    case 1:
      img = head;
      break;
    case 2:
      img = bodyMan;
      break;
    case 3:
      img = armOne;
      break;
    case 4:
      img = armTwo;
      break;
    case 5:
      img = legOne;
      break;
    case 6:
      img = legTwo;
      break;
    case 7:
      img = deadMan;
      break;
  }
  return (
    <div>
      <img id="img" src={img}></img>
    </div>
  );
}
export default Man;
