import React, { useState,ChangeEvent, useEffect } from 'react';
import './App.css';
import Button from './button/Button';
import Settings from './settings/Settings';

function App() {

// Open settings above counter display
  const [openSettings, setOpenSettings] = useState(false);

// Current value of counter

  const [currentStartValue, setCurrentStartValue] = useState(0);
  const [currentMaxValue, setCurrentMaxValue] = useState(5);

// Variables for correct worked counter 
  const [start, setStart] = useState(currentStartValue);
  const [max, setMax] = useState(currentMaxValue);
  const [counter, setCounter] = useState<number>(currentStartValue);
  const [temp, setTemp] = useState(1);

// Toggle display counter from text on display to worked counter
  const [applySetting, setApplySetting] = useState(false);

// Value for style display of counter
const [strokeDashoffsetValue, setStrokeDashoffsetValue] = useState(0);

/*--- Input type of number is control data ---*/
  const onChangeStartValue = (value: number) => setStart( value );
  const onChangeMaxValue = (value: number) => setMax( value );

/*--- Set counter settings data ---*/
  const onClickSendSettings = () => {
    setApplySetting(true);
    setTemp(1);
    setOpenSettings(false);
    setStrokeDashoffsetValue(0);
    setCurrentMaxValue(max);
    setCurrentStartValue(start);
  }

/*--- Reset counter value and remove style for counter display ---*/
  const reset = () => {
    setCounter(currentStartValue);
    setTemp(1);
    setStrokeDashoffsetValue(0);
  };

/*--- Increment counter value and add style for counter display ---*/
  const increment = () => {
    setCounter(counter + 1);
    setTemp(temp + 1);
    setStrokeDashoffsetValue(strokeDashoffsetValue + circleClockwise);
  };

/*--- Close modal settings ---*/
  const closeModal = () => {
    setOpenSettings(false);
    setStart(currentStartValue);
    setMax(currentMaxValue);
  }

/*!--- Variables for adding styles on display counter ---!*/
// Value step of one increment counter
  // const step = (440 / (max - start) );
  const step = (440 / (currentMaxValue - currentStartValue) );
// Value for styles circle of clockwise
  // const circleClockwise = (440 / (max - start) ) * -1;
  const circleClockwise = (440 / (currentMaxValue - currentStartValue) ) * -1;
// Value changed color for styles display
  const changeColorValue = strokeDashoffsetValue * -1;
// Last step to max value for add styles on display counter
  const lastStep = (440 - step - 15);


/*-- Add stroke on counter display --*/
  const strokeStyle = {
    strokeDashoffset: strokeDashoffsetValue
  }

/*-- Change color of stroke on counter display depending on the counter value --*/
  const strokeChangeColorStyle = {
    stroke: changeColorValue < 240  ? 'green' : changeColorValue > 239 && changeColorValue < lastStep ? 'darkorange' : 'red' 
  }


// Synchronization of counter values, counter display value and start counter value
  useEffect(() => { setCounter(currentStartValue) }, [currentStartValue]);


  return (
    <div className="App">
      {
        !openSettings ? 
          // <div className={`counterWrapper ${counter === max ? 'counterWrapperStop' : ''}`}>
          <div className={`counterWrapper ${counter === currentMaxValue ? 'counterWrapperStop' : ''}`}>
            <div className='display'>
              <h1 className={counter === max ? 'stop' : ''}>
                { 
                  !applySetting ? 'Please set values in settings' 
                    : <React.Fragment>
                        <div className={`circleWrapper ${currentMaxValue === counter ? 'circleWrapperError' : ''}`}>
                        {/* <div className={`circleWrapper ${max === counter ? 'circleWrapperError' : ''}`}> */}
                          
                          <svg>
                            <circle style={strokeChangeColorStyle} cx={70} cy={70} r={70}></circle>
                            <circle style={strokeStyle} id={'ttt'} cx={70} cy={70} r={70}></circle>
                          </svg>
                          <div className={`num ${currentMaxValue === counter ? 'numStop' : ''}`}>
                          {/* <div className={`num ${max === counter ? 'numStop' : ''}`}> */}
                            {counter}
                          </div>

                        </div>
                        
                        <div className='btnBlock'>
                            {/* <Button styleButton='changedStyle' title='inc' onClickButton={increment} disabled={!applySetting || counter === max} /> */}
                            <Button styleButton='changedStyle' title='inc' onClickButton={increment} disabled={!applySetting || counter === currentMaxValue} />
                            <Button styleButton='changedStyle' title='reset' onClickButton={reset} disabled={!applySetting || counter === start}  />
                        </div>
                      </React.Fragment>
                }
              </h1>
            </div>        

            <i title='Settings' style={{margin: !applySetting ? '3rem 0 2rem' : ''}} onClick={() => setOpenSettings(!openSettings)} className='bx bxs-cog settingsIcon'></i>
        </div>

          : <Settings
              max={max}
              start={start}
              onChangeMaxValue={onChangeMaxValue}
              onChangeStartValue={onChangeStartValue}
              onClickSendSettings={onClickSendSettings}
              closeModal={closeModal}
            /> 
      }


    </div>
  );
}

export default App;