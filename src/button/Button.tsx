import React from 'react';
import './button.css';

type ButtonPropsType = {
    title: string
    disabled?: boolean
    onClickButton: () => void
    styleButton?: 'changedStyle' | ''
}

const Button: React.FC<ButtonPropsType> = ({ title, disabled, onClickButton, styleButton }) => {
  return (
    <button className={`${styleButton ? styleButton : ''}`} disabled={disabled} onClick={onClickButton}>{title}</button>
  )
}

export default Button;