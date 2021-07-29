import React from "react";
import P5Wrapper from "react-p5-wrapper";

function Cuadraditos() {
  const sketch = (p5) => {
    // this class describes the structure
    // and movents of the brick
    class Brick {
      constructor(bc, y) {
        this.brickColor = bc;
        this.yPos = y;
        this.xPos = 0;
      }

      // this function creates the brick
      createBrick() {
        p5.fill(this.brickColor);
        p5.rect(this.xPos, this.yPos, 100, 50);
      }

      // this function sets the speed
      // of movement of the brick to 1
      setSpeed() {
        this.xSpeed = 1;
      }

      // this function set the bricks in motion
      moveBrick() {
        this.xPos += this.xSpeed;
        if (this.xPos + 100 >= p5.width || this.xPos <= 0) {
          this.xSpeed *= -1;
        }
      }
    }
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight + 0, 5);
      p5.createP("Keep the mouse clicked").style("color", "#ffffff");
      p5.createP("to check whether the bricks").style("color", "#ffffff");
      p5.createP("are moving at same speed or not").style("color", "#ffffff");
    };
    // creating two bricks of
    // colors white and black
    let brick1 = new Brick("white", 100);
    let brick2 = new Brick("black", 250);

    //
    brick1.setSpeed();
    brick2.setSpeed();

    p5.draw = () => {
      p5.background(0);
      if (p5.mouseIsPressed) {
        p5.background(50);
      }
      brick1.createBrick();
      brick1.moveBrick();
      if (!p5.mouseIsPressed) {
        createBars();
      }
      brick2.createBrick();
      brick2.moveBrick();
    };

    // this function creates the black and
    // white bars across the screen
    function createBars() {
      let len = 12;
      for (let i = 0; i < p5.width / len; i++) {
        p5.fill("white");
        if (i % 2 == 0) p5.rect(i * len, p5.height, len, -p5.height);
      }
    }
  };

  return <P5Wrapper sketch={sketch} />;
}

export default Cuadraditos;
