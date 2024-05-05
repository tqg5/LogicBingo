import React from 'react';
import ReactDOM from 'react-dom/client';
import Entry from './entry';
import { BingoOptions } from '../types';

const twitch = window.Twitch.ext;

let intervalID = null;

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
        const content = ((JSON.parse(twitch.configuration.broadcaster.content as string, reviver)) as unknown) as BingoOptions;
        console.log('parsed content', content)
  
        debugger
  
        ReactDOM.createRoot(document.getElementById("app")).render(
            <React.StrictMode>
                <Entry content={content} />
            </React.StrictMode>
        );

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