import styles from './itemButton.module.css';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  slug: number;
  onCloseClick: (slug: number) => void;
}

export default function ItemButton(props: Props) {
  const { slug, children, onCloseClick } = props;

  const handleCloseClick = () => {
    onCloseClick(slug);
  }

  return (
    <div className={ styles.itemButton }>
      <span className={ styles.text }>{ children }</span>
      <span className={ styles.close } onClick={ handleCloseClick }>x</span>
    </div>
  )
}