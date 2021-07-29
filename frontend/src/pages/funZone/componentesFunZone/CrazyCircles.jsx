import React from "react";
import P5Wrapper from "react-p5-wrapper";

let xbutton, ybutton, dbutton;
let colorbutton;
function CrazyCircles() {
  const sketch = (p5) => {
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth,p5.windowHeight);
        xbutton = 100;
        ybutton = 100;
        dbutton = 100;
    };
    p5.draw = () => {
        p5.background(220);
        if(p5.mouseIsPressed&&p5.mouseX>50&&p5.mouseX<150&&p5.mouseY>50&&p5.mouseY<150){
            p5.background(0,200,255);
            p5.stroke(0)
            p5.strokeWeight(4);
            for (let x = 0; x <= p5.width; x += 50) {
                for (let y = 0; y <= p5.width; y += 50) {
                    p5.fill(p5.random(255), p5.random(255), p5.random(255));
                    p5.ellipse(x, y, p5.random(50),p5.random(25));
                }
            }
      }	else{
        p5.stroke(255)
        p5.strokeWeight(4);
        p5.fill(0);     
      }
        p5.ellipse(xbutton,ybutton,dbutton);
      }
    };

  return <P5Wrapper sketch={sketch}/>;
}

export default CrazyCircles;