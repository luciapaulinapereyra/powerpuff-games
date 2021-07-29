import React from "react";
import P5Wrapper from "react-p5-wrapper";
let symmetry = 6;
let angle = 360 / symmetry;
let saveButton, clearButton;

function Kaleidoscope() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth,p5.windowHeight+0,5);
      p5.angleMode(p5.DEGREES);
      p5.background(127);
    };
    p5.draw = () => {
        p5.translate(p5.width / 2, p5.height / 2);
        if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height) {
          let mx = p5.mouseX - p5.width / 2;
          let my = p5.mouseY - p5.height / 2;
          let pmx = p5.pmouseX - p5.width / 2;
          let pmy = p5.pmouseY - p5.height / 2;
      
          if (p5.mouseIsPressed) {
            for (let i = 0; i < symmetry; i++) {
              p5.rotate(angle);
              p5.strokeWeight(4);
              p5.line(mx, my, pmx, pmy);
              p5.push();
              p5.scale(1, -1);
              p5.line(mx, my, pmx, pmy);
              p5.pop();
            }
          }
          if (p5.keyIsPressed){
            p5.background(127);
          }
        }
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default Kaleidoscope;