import React from 'react';
import InputNumber from '../inputNumber/InputNumber';
import Button from '../button/Button';
import './settings.css';

type SettingsPropsType = {
  start: number
  max: number
  onChangeStartValue: (value: number) => void
  onChangeMaxValue: (value: number) => void
  onClickSendSettings: () => void
  closeModal: () => void
}

const Settings: React.FC<SettingsPropsType> = ({ start, max, onChangeMaxValue, onChangeStartValue, onClickSendSettings, closeModal }) => {
  
  
  return (
    <div className='settings' onClick={closeModal}>
      <div className='settings__inner' onClick={(e) => e.stopPropagation()}>
        <div className='closed'>
          <span onClick={closeModal}>×</span>
        </div>
        <h1>Settings</h1>
        <InputNumber value={start} onChangeInput={onChangeStartValue} max={max} min={-1} title='start value: ' />        
        <InputNumber value={max} onChangeInput={onChangeMaxValue} min={start} title='max value: ' />
        <Button disabled={start === -1 || start === max} title='set' onClickButton={onClickSendSettings} />
      </div>
  </div>
  )
}

export default Settings;