import { useState } from 'react'
import styles from './App.module.css'
import ElementSelector from './components/elementSelector.tsx';
import Button from './components/button.tsx';
import ItemButton from './components/itemButton.tsx';
import Header from './components/header.tsx';

const arrayLength = 300;

function App() {
  const [ items, setItems ] = useState([] as number[]);
  const [ selectorOpened, setSelectorOpened ] = useState(false);

  const elements = Array.from({ length: arrayLength }, (_, index) => ({
    id: index + 1,
    title: `Element ${ index + 1 }`,
  }));

  const toggleSelector = () => {
    if (!selectorOpened) setSelectorOpened(true)
    else setSelectorOpened(false)
  }

  const onCloseElementHandle = (slug: number) => {
    setItems(items.filter(element => element !== slug));
  }
  const onSaveHandle = (newValues: number[] | []) => {
    setItems(newValues);
    toggleSelector();
  }

  return (
    <>
      <Header />

      <section className={ styles.section }>
        <h3>Select items</h3>
        <p>You currently have { items.length > 0 ? items.length : 'no' } selected items </p>
        { items.length > 0 && <div className={ styles.selectedItems }>
          {
            items.map(item => <ItemButton
              slug={ item }
              key={ item }
              onCloseClick={ onCloseElementHandle }
            >{
              elements.find(element => element.id === item)?.title }
            </ItemButton>)
          }
        </div> }
        <div className={ styles.mainButtonContainer }>
          <Button onClick={ toggleSelector } variant="success">Change my choice</Button>
        </div>
        { selectorOpened && <ElementSelector
            elements={ elements }
            itemsList={ items }
            onSave={ (values) => onSaveHandle(values) }
            onClose={ toggleSelector }
        /> }
      </section>
    </>
  )
}

export default App
