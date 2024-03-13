import React, { useState, useEffect } from 'react';
import Options from './options';
import { updateConfiguration } from '../common.jsx';
import { Table } from './styles.js';
import { TwitchContentValueObject, TwitchContentValue, TwitchContentOptions, TableOptions, TwitchContent, BingoOptions } from './types';

const twitch = window.Twitch.ext;

const List = ({ content }: { content: BingoOptions }) => {
    //const [options, setOptions] = useState(JSON.parse(twitch.configuration.broadcaster?.content ?? []));

  const [options, setOptions] = useState<TableOptions | null>(null);
  const [optionsTable, setOptionsTable] = useState<JSX.Element[] | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [newOptionValue, setNewOptionValue] = useState<string | null>(null);

  console.log('merged options', options)

  const updateOptions = (options: TableOptions) => {
    if(!options) return;

    const nonDuplicatedOptions = [...(new Set([...Options, ...options]))]
    updateConfiguration('options', nonDuplicatedOptions);
    
    setOptions((nonDuplicatedOptions as unknown) as TableOptions);
  };

  const toggleSelectedOption = (e: React.MouseEvent<HTMLDivElement>) => {
    if(!options) return;

    // If event target not an HTMLButtonElement, exit
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    const val = e.target.dataset.value as string;

    const config = options.get(val);

    console.log('before toggle', config)

    if(!config) return;

    console.log('isSelected', config.isSelected)
    config.isSelected = !config.isSelected;

    console.log('after toggle', config)

    options.set(val, config);

    console.log('key', e.target.dataset.value)
    console.log('updated map', options)
    setOptions(new Map(options));
    updateConfiguration('options', options);
  }

  const deleteOption = (e: React.MouseEvent<HTMLDivElement>) => {
    // If event target not an HTMLButtonElement, exit
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    const val = e.target.dataset.value as string;

    options?.delete(val);

    setOptions(new Map(options));
    updateConfiguration('options', options);
  }

  const beginGame = () => {
    const val = e.target.dataset.value as string;

    
  }

  const createTable = (options: TableOptions) => {
    if(!options) return null;

    const cells = [] as JSX.Element[];

    console.log('options table', options)
    options.forEach((value, key) => {
      //console.log('value, key', value, key)
      cells.push(
          <div
            className='row'
            onClick={toggleSelectedOption}
            data-value={value.name}
            style={{
              textAlign: 'center',
              border: `1px solid ${value.isSelected ? 'green' : 'red'}`,
              padding: '20px 10px',
              position: 'relative'
            }}
          >
            <div>
              <div
                onClick={deleteOption}
                data-value={value.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  cursor: 'pointer'
                }}
              >
                X
              </div>
              {value.name}
            </div>
          </div>
      )
    });

    return cells as JSX.Element[];
  }

  const initDefaultStore = () => {
    return {
      dataType: 'Map',
      value: [...Options].map(option => ([
      option,
      {
        name: option,
        isSelected: false
      }
    ]))
  }}

  useEffect(() => {
    //twitch.configuration.set('broadcaster', '1', JSON.stringify({options: initDefaultStore()}));

    console.log('broadcaster', twitch.configuration.broadcaster)
    debugger
    if(!content) return;
debugger

console.log('content', content)
    console.log('options', new Map(content.options))
    setOptions(new Map(content.options));
    // setIsGameStarted(isGameStarted);
    // setSelectedOptions(new Set(selectedOptions));

    //console.log('initDefaultStore', initDefaultStore())
  }, [ content ]);

  useEffect(() => {
    console.log('options', options)
    if(options) {
      setOptionsTable(createTable(options));
    }
  }, [ options, content ])

  if(!options) return;

  return (
    <>
      <Table>
        {optionsTable}
      </Table>
       

      <table>
        <tbody>
          <tr>
            <td>
                <input
                  onChange={e => {
                    console.log('e', e);

                    setNewOptionValue(e.target.value);
                  }}
                  type='text'
                />
            </td>
            <td>
              <button onClick={() => {
                  if(!newOptionValue) return;

                  console.log('options', options);
                  //console.log('saving', JSON.stringify(getOptionsWithoutDuplicates([...options, newOptionValue])))

                  const newOptionValueMap = new Map([[newOptionValue, {name: newOptionValue, isSelected: false}]]);
                  
                  const map = new Map([...options, ...newOptionValueMap]);

                  console.log('map', map)
                  //const noDuplicates = getOptionsWithoutDuplicates([...options, ...(new Map([newOptionValue, {name: newOptionValue, isSelected: false}]))]);
                  //updateOptions(getOptionsWithoutDuplicates([...options, newOptionValue]));
                  setOptions(map);
                  setNewOptionValue(null);

                  updateConfiguration('options', map);
                }}
              >
                Add Option
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button>Begin Game</button>
    </>
  )
}

export default List;