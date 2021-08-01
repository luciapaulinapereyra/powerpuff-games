import React from "react";
import { URL_FRONT as BASE_URL } from "../common/constants";
function GoBack(props) {
  async function back() {
    window.location.href = `${BASE_URL}`;
  }
  return (
    <div>
      <button className={props.css} onClick={back}>
        Volver al Lobby
      </button>
    </div>
  );
}
export default GoBack;
