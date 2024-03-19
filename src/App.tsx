import React, { useState,ChangeEvent, useEffect } from 'react';
import './App.css';
import Button from './button/Button';
import Settings from './settings/Settings';
import Display from './display/Display';

function App() {

// Open settings above counter display
  const [openSettings, setOpenSettings] = useState(false);

// Last fixed input value after send settings on click / Последние значения в инпутах, которые были сохранены, после применения настроек для счетчика
  const [currentStartValue, setCurrentStartValue] = useState(0);
  const [currentMaxValue, setCurrentMaxValue] = useState(5);

// Variables for correct worked counter 
  const [start, setStart] = useState(currentStartValue);
  const [max, setMax] = useState(currentMaxValue);
  const [counter, setCounter] = useState<number>(currentStartValue);

// Toggle display counter from text on display to worked counter
  const [startDisplay, setStartDisplay] = useState(true);

/*!--- Variables for adding styles on display counter ---!*/
// Value for stroke style display of counter on clockwise, for this we need -> step * -1 in increment
const [strokeDashoffsetValue, setStrokeDashoffsetValue] = useState(0);
// One step for stroke styles circle of clockwise ( * -1 )
const step = ( 440 / (currentMaxValue - currentStartValue) );

/*--- State of input value ---*/
  const onChangeStartValue = (value: number) => setStart( value );
  const onChangeMaxValue = (value: number) => setMax( value );

/*--- Set counter settings data ---*/
  const onClickSendSettings = () => {
    setStartDisplay(false);
    setOpenSettings(false);
    setStrokeDashoffsetValue(0);
    setCurrentMaxValue(max);
    setCurrentStartValue(start);
    setCounter(start);
  }

/*--- Reset counter value and remove style for counter display ---*/
  const reset = () => {
    setCounter(currentStartValue);
    setStrokeDashoffsetValue(0);
  };
  

/*--- Increment counter value and add style for counter display ---*/
  const increment = () => {
    setCounter(counter + 1);
    setStrokeDashoffsetValue(strokeDashoffsetValue + (step * -1));
  };

/*--- Close modal settings ---*/
  const closeModal = () => {
    setOpenSettings(false);
    setStart(currentStartValue);
    setMax(currentMaxValue);
  };


// Synchronization of counter values, counter display value and start counter value
  useEffect(() => { setCounter(currentStartValue) }, [currentStartValue]);


  return (
    <div className="App">
      {
        !openSettings ? 
          <div className={`counterWrapper ${counter === currentMaxValue ? 'counterWrapperStop' : ''}`}>
            <div className='display'>
                { 
                  startDisplay ? <h1>Please set values in settings</h1> 
                    : <React.Fragment>
                      <Display
                        counter={counter}
                        currentMaxValue={currentMaxValue}
                        currentStartValue={currentStartValue} 
                        strokeDashoffsetValue={strokeDashoffsetValue}
                        step={step}
                      />
                        
                      <div className='btnBlock'>
                        <Button styleButton='changedStyle' title='inc' onClickButton={increment} disabled={startDisplay || counter === currentMaxValue} />
                        <Button styleButton='changedStyle' title='reset' onClickButton={reset} disabled={startDisplay || counter === start}  />
                      </div>
                    </React.Fragment>
                }
            </div>        

            <i title='Settings' style={{margin: startDisplay ? '3rem 0 2rem' : ''}} onClick={() => setOpenSettings(!openSettings)} className='bx bxs-cog settingsIcon'></i>
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