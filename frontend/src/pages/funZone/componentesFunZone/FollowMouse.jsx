import React from "react";
import P5Wrapper from "react-p5-wrapper";
let x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;

function FollowMouse() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight + 0, 5);
      p5.strokeWeight(20.0);
      p5.stroke(255, 100);
    };
    p5.draw = () => {
      p5.background(0);

      p5.dx = p5.mouseX - x;
      p5.dy = p5.mouseY - y;
      angle1 = p5.atan2(p5.dy, p5.dx);
      x = p5.mouseX - p5.cos(angle1) * segLength;
      y = p5.mouseY - p5.sin(angle1) * segLength;

      segment(x, y, angle1);
      p5.ellipse(x, y, 20, 20);
    };
    function segment(x, y, a) {
      p5.push();
      p5.translate(x, y);
      p5.rotate(a);
      p5.line(0, 0, segLength, 0);
      p5.pop();
    }
  };

  return <P5Wrapper sketch={sketch} />;
}

export default FollowMouse;
