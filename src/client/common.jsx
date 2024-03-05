const twitch = window.Twitch.ext;

function replacer(key, value) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
}

export const updateConfiguration = (key, data) => {
    const content = JSON.parse(twitch.configuration.broadcaster.content);

    console.log('updateConfiguration', JSON.stringify({
        ...content,
        [key]: data
    }, replacer));
    
    twitch.configuration.set('broadcaster', '1', JSON.stringify({
        ...content,
        [key]: data
    }, replacer));
}