import styles from './elementSelector.module.css';
import Button from './button.tsx';
import ItemButton from './itemButton.tsx';
import React, { useState } from 'react';
import cn from 'classnames';

interface Props {
  itemsList: number[];
  elements: { id: number, title: string }[];
  onSave: (value: number[] | []) => void;
  onClose: () => void;
}

export default function ElementSelector({ itemsList, elements, onSave, onClose }: Props) {
  const [ selected, setSelected ] = useState(itemsList);
  const [ query, setQuery ] = useState('');
  const [ limit, setLimit ] = useState('all');

  const handleOnSave = () => {
    onSave(selected);
  }

  const removeSelected = (slug: number) => {
    setSelected(selected.filter(element => element !== slug))
  }
  const handleCheckboxesChange = (slug: number) => {
    if (selected.includes(slug)) setSelected(selected.filter(element => element !== slug))
    else {
      if (selected.length < 3) {
        setSelected([ ...selected, slug ])
      }
    }
  }
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
  }

  const filteredItems = elements.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  const limitedResults = limit === 'all' ? filteredItems : filteredItems.slice(0, parseInt(limit));

  return (
    <div className={ styles.elementSelector }>
      <div className={ styles.header }>
        <div className={ styles.title }>Select items</div>
        <button type="button" className={ styles.closeButton } onClick={ onClose }>X</button>
      </div>
      <div className={ styles.filters }>
        <div className={ styles.search }>Search &nbsp;
          <input
            type="text"
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
          />
        </div>
        <div className={ styles.itemsFilter }>Filter &nbsp;
          <select value={ limit } onChange={ handleLimitChange }>
            <option value="all" defaultChecked>No filter</option>
            <option value="10">&gt; 10</option>
            <option value="50">&gt; 50</option>
            <option value="100">&gt; 100</option>
          </select>
        </div>
      </div>
      <div className={ styles.elementsList }>
        <ul>
          { limitedResults.map(element => (
            <li key={ element.id }>
              <label
                htmlFor={ (element.id).toString() }
                className={ cn((selected.length >= 3 && !selected.includes(element.id)) ? styles.disabled : undefined) }
              >
                <input
                  id={ (element.id).toString() }
                  type={ 'checkbox' }
                  checked={ selected.includes(element.id) }
                  onChange={ () => handleCheckboxesChange(element.id) }
                  disabled={ selected.length >= 3 && !selected.includes(element.id) }
                />
                { element.title }
              </label>
            </li>
          )) }
        </ul>
      </div>
      <div className={ styles.selectedItemsList }>
        <p>Current selected items:</p>
        <div className={ styles.selectedItems }>
          { selected.map(item => <ItemButton
            slug={ item }
            key={ item }
            onCloseClick={ removeSelected }
          >{ elements.find(element => element.id === item)?.title }
          </ItemButton>)
          }
        </div>
      </div>
      <div className={ styles.controls }>
        <Button variant="success" onClick={ handleOnSave }>Save</Button>
        <Button variant="cancel" onClick={ onClose }>Cancel</Button>
      </div>
    </div>
  )
}