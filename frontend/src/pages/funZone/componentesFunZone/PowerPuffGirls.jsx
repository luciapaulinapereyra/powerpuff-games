import React from "react";
import P5Wrapper from "react-p5-wrapper";

let img;
function RecursiveTree() {
  const sketch = (p5) => {
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        p5.background('#ff5b36');
        img = p5.loadImage("https://yt3.ggpht.com/ytc/AKedOLSsUiKrXatcJvVsBfQ5NikO6QZs5EiJVTH_-Fs4YA=s900-c-k-c0x00ffffff-no-rj")
    };

    function variableEllipse( x,  y, px, py) {
        var speed = p5.abs(x-px) + p5.abs(y-py);
        p5.stroke(speed);
        if (speed!= 0) {
            p5.image(img, x, y, speed, speed);
        }
    }
    p5.draw = () => {
      variableEllipse(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY)
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default RecursiveTree;