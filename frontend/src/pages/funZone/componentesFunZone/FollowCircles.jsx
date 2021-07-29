import React from "react";
import P5Wrapper from "react-p5-wrapper";
let num = 60;
let mx = [];
let my = [];
function FollowCircles() {
  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth,p5.windowHeight+0,5);
      p5.noStroke();
      p5.fill(255, 153);
      for (let i = 0; i < num; i++) {
        mx.push(i);
        my.push(i);
      }
    };
    p5.draw = () => {
        p5.background(237, 34, 93);
        let which = p5.frameCount % num;
        mx[which] = p5.mouseX;
        my[which] = p5.mouseY;  
        for (let i = 0; i < num; i++) {
          let index = (which + 1 + i) % num;
          p5.ellipse(mx[index], my[index], i, i);
        }
    };
  };

  return <P5Wrapper sketch={sketch}/>;
}

export default FollowCircles;