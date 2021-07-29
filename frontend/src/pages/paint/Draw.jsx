import React from "react";
import P5Wrapper from "react-p5-wrapper";

let thickness=5;
let slider;
let colorPicker;
let btnErase;
let btnEraseAll;
const backColor=250;

function Draw() {
    const sketch = (p5) => {
        function drawWithPencil(){
            if(p5.mouseIsPressed){
                p5.line(p5.pmouseX,p5.pmouseY,p5.mouseX,p5.mouseY);
            }
        }
        function thickWithSlider(){
            let val = slider.value();
            thickness=val;
        }
        function changeColor(){
            p5.stroke(colorPicker.color());
        }        
        function erase(){
            p5.stroke(backColor);
        }
        function eraseAll(){
            p5.background(backColor);
        }

        p5.setup = () => {
            p5.createCanvas(1900,850);
            p5.background(backColor);
            slider = p5.createSlider(5, 100, 1);
            colorPicker = p5.createColorPicker('black');
            colorPicker.mousePressed(changeColor);
            btnErase = p5.createButton('Erase');
            btnErase.mousePressed(erase);
            btnEraseAll = p5.createButton('Erase All');
            btnEraseAll.mousePressed(eraseAll);
        };

        p5.draw = () => {
            p5.cursor('lapiz.png');
            p5.strokeWeight(thickness);
            drawWithPencil();
            thickWithSlider();
        }
    }
    return <P5Wrapper sketch={sketch}/>;
}

export default Draw;