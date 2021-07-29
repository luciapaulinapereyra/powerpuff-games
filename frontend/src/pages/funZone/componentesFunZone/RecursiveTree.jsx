import React from "react";
import P5Wrapper from "react-p5-wrapper";
let theta;
function RecursiveTree() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth,p5.windowHeight+0,5);
    };
    function branch(h) {
        h *= 0.66;
        if (h > 2) {
            p5.push();
            p5.rotate(theta);
            p5.line(0, 0, 0, -h);
            p5.translate(0, -h);
            branch(h);
            p5.pop();  
            p5.push();
            p5.rotate(-theta);
            p5.line(0, 0, 0, -h);
            p5.translate(0, -h);
            branch(h);
            p5.pop();
        }
    }
    p5.draw = () => {
        p5.background(0);
        p5.frameRate(30);
        p5.stroke(255);
        let a = (p5.mouseX / p5.width) * 90;
        theta = p5.radians(a);
        p5.translate(p5.width/2,p5.height);
        p5.line(0,0,0,-300);
        p5.translate(0,-300);
        branch(300);
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default RecursiveTree;