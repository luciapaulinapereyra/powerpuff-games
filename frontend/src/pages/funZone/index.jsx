import React, { useState, useEffect } from "react";
import GoBack from "../../components/GoBack";
import RecursiveTree from "./componentesFunZone/RecursiveTree";
import GreenCircles from "../funZone/componentesFunZone/GreenCircles";
import CrazyCircles from "../funZone/componentesFunZone/CrazyCircles";
import PowerPuffGirls from "./componentesFunZone/PowerPuffGirls";
import Rectangules from "./componentesFunZone/Rectangules";
import FollowMouse from "./componentesFunZone/FollowMouse";
import Kaleidoscope from "./componentesFunZone/Kaleidoscope";
import ColorTint from "./componentesFunZone/ColorTint";
import FollowCircles from "./componentesFunZone/FollowCircles";
import "../lobby/css/background.css";
import "../funZone/css/FunZoneCss.css";


function FunZone() {
  const [cont, setCont] = useState(0)

  useEffect(() => {
      if (cont === 9) {
          setCont(0)
      }
  }, [cont])

  return (
    <div>
      <div className="boxFunZone">
        <GoBack css={"LobbyButton"} />
        <br />
        <button
          className="LobbyButton"
          onClick={() => {
            setCont(cont + 1);
          }}
        >
          Siguiente
        </button>
      </div>
        {cont === 0 && <div className="center"><GreenCircles/></div>}
        {cont === 1 && <div className="center"><RecursiveTree/></div>}
        {cont === 2 && <div className="center"><PowerPuffGirls/></div>}
        {cont === 3 && <div className="center"><CrazyCircles/></div>}
        {cont === 4 && <div className="center"><Rectangules/></div>}
        {cont === 5 && <div className="center"><FollowMouse/></div>}
        {cont === 6 && <div className="center"><Kaleidoscope/></div>}
        {cont === 7 && <div className="center"><ColorTint/></div>}
        {cont === 8 && <div className="center"><FollowCircles/></div>}
    </div>
  );
}
export default FunZone;