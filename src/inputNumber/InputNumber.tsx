import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import './inputNumber.css';

type DefaultNumberPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputNumberPropsType = DefaultNumberPropsType & {
    value: number
    onChangeInput: (e: number) => void
    min?: number
    max?: number
    title: string
};

const InputNumber: React.FC<InputNumberPropsType> = ({ value, onChangeInput, onChange, max, min, title }) => {

  const onChanged = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    // if value get from props
    onChangeInput && onChangeInput(+e.currentTarget.value);
  } 


  return (
    <div className='input'>
        <label> {title} </label>
        <input className={value === min || value === max ? 'error' : ''} type="number" value={value} onChange={onChanged} min={min} max={max} />
        {/* <input className={value === min || value === max ? 'error' : ''} type="number" value={v} onChange={(e) => setV(+e.currentTarget.value)} min={min} max={max} /> */}
    </div>
  )
}

export default InputNumber;