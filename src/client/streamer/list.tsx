import React, { useState, useEffect } from 'react';
import Options from './options';
import { updateConfiguration } from '../common.jsx';
import { Table } from './styles.js';

const twitch = window.Twitch.ext;

let isGameStartedConfig = false;
let content: BingoOptions | null = null;
let fetchedConfig = false;

type TwitchContentValueObject = {
  name: string;
  isSelected: boolean;
}

type TwitchContentValue =  [[
  string,
  TwitchContentValueObject
]]

type TwitchContentOptions = {
  dataType: string;
  value: TwitchContentValue;
}

type TableOptions = Map<string, TwitchContentValueObject> | null

interface TwitchContent {
  options: TwitchContentOptions;
}

interface BingoOptions {
  options: Map<string, TwitchContentValueObject>
}

interface Content {

}
function reviver(key: string, value:TwitchContentOptions) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map<string, { name: string, isSelected:boolean}>(value.value);
    }
  }
  return value;
}

twitch.configuration.onChanged(function() {
  console.log('on change')
  // Checks if configuration is defined
  if (twitch.configuration.broadcaster) {
    try {
      console.log('fetched content', twitch.configuration.broadcaster.content)
      // Parsing the array saved in broadcaster content
      content = ((JSON.parse(twitch.configuration.broadcaster.content as string, reviver)) as unknown) as BingoOptions;
      console.log('parsed content', content)

      isGameStartedConfig = content?.gameState?.isGameStarted ?? false;

      fetchedConfig = true;

      // Checking the content is an object
      if (typeof content === 'object') {
        // Updating the value of the options array to be the content from config
      } else {
        console.log('Invalid config');
      }
    } catch (e) {
      console.log('Invalid config:', e);
    }
  }
});

const List = () => {
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

  const beginGame = () => {

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
              padding: '20px 10px'
            }}
          >
            {value.name}
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
    if(!fetchedConfig || !content) return;

    console.log('options', new Map(content.options))
    setOptions(new Map(content.options));
    // setIsGameStarted(isGameStarted);
    // setSelectedOptions(new Set(selectedOptions));

    //console.log('initDefaultStore', initDefaultStore())
  }, [ fetchedConfig, content ]);

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