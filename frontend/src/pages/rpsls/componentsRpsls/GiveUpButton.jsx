import React from "react";
import "../css/indexRpsls.css";
import { URL_FRONT as BASE_URL } from "../../../common/constants";
function GiveUpButton({ giveUp }) {
  async function backAndGiveUp() {
    giveUp();
    alert("Usted se rendira y volvera al lobby");
    window.location.href = `${BASE_URL}`; //redirect to the lobby
  }
  return (
    <div>
      <button className="button" onClick={backAndGiveUp}>
        Rendirse
      </button>
    </div>
  );
}
export default GiveUpButton;
