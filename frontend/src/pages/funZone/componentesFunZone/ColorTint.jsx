import React from "react";
import P5Wrapper from "react-p5-wrapper";
const barWidth = 20;
let lastBar = -1;
function ColorTint() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth,p5.windowHeight+0,5);
      p5.colorMode(p5.HSB, p5.width, p5.height, 100);
      p5.noStroke();
    };

    p5.draw = () => {
        let whichBar = p5.mouseX / barWidth;
        if (whichBar !== lastBar) {
          let barX = whichBar * barWidth;
          p5.fill(barX, p5.mouseY, 66);
          p5.rect(barX, 0, barWidth, p5.height);
          lastBar = whichBar;
        }
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default ColorTint;