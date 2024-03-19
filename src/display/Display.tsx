import React from "react";
import './Display.css';



type DisplayPropsType = {
  counter: number
  currentMaxValue: number
  currentStartValue: number
  strokeDashoffsetValue: number
  step: number

}
function Display(props: DisplayPropsType) {

  const { counter, currentMaxValue, strokeDashoffsetValue, step } = props;


/*!--- Variables for adding styles on display counter ---!*/
// Value changed color for styles display
  const changeColorValue = strokeDashoffsetValue * -1;
// Last step to max value for add styles on display counter
  const lastStep = (440 - step - 15);


/*-- Add stroke on counter display --*/
  const strokeStyle = {
    strokeDashoffset: strokeDashoffsetValue
  };

/*-- Change color of stroke on counter display depending on the counter value --*/
  const strokeChangeColorStyle = {
    stroke: changeColorValue < 240  ? 'green' : changeColorValue > 239 && changeColorValue < lastStep ? 'darkorange' : 'red' 
  }
  

  return (
    <div className={`circleWrapper ${ currentMaxValue === counter ? "circleWrapperError" : ""}`}>
      <svg>
        <circle style={strokeChangeColorStyle} cx={70} cy={70} r={70}></circle>
        <circle style={strokeStyle} cx={70} cy={70} r={70}></circle>
      </svg>

      <div className={`num ${currentMaxValue === counter ? "numStop" : ""}`}>
        {counter}
      </div>
    </div>
  );
}

export default Display;
