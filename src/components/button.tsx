import React from 'react';
import cn from 'classnames';
import styles from './button.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'success' | 'cancel'
}

export default function Button(props: Props) {
  const {
    variant = 'success',
    type = 'button',
    onClick,
    disabled,
    children,
  } = props;
  return (
    <button
      type={ type }
      onClick={ onClick }
      disabled={ disabled }
      className={ cn(styles[variant], styles.button) }
    >{ children }</button>
  )
}