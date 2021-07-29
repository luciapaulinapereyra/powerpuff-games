import React from "react";
import P5Wrapper from "react-p5-wrapper";
let t=0;

function GreenCircles() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth,p5.windowHeight+0,5);
      p5.noStroke();
      p5.fill(40,200,40);
    };

    p5.draw = () => {
      p5.background(10,10);
      for (let x = 0; x <= p5.width; x = x + 30) {
        for (let y = 0; y <= p5.height; y = y + 30) {
          const anguloX = p5.map(p5.mouseX, 0, p5.width, -4 * p5.PI, 4 * p5.PI, true);
          const anguloY = p5.map(p5.mouseY, 0, p5.height, -4 * p5.PI, 4 * p5.PI, true);
          const angulo = anguloX * (x / p5.width) + anguloY * (y / p5.height)
          const myX = x + 20 * p5.cos(2 * p5.PI * t + angulo);
          const myY = y + 20 * p5.sin(2 * p5.PI * t + angulo);
          p5.ellipse(myX, myY, 10);
        }
      }
      t = t + 0.01;
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default GreenCircles;