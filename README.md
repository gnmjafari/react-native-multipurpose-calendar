# react-native-multipurpose-calendar

## Getting started

`$ npm install react-native-multipurpose-calendar --save`

### Mostly automatic installation

`$ react-native link react-native-multipurpose-calendar`

## Usage

```javascript
import { calendar } from "react-native-multipurpose-calendar";
```

```javascript
<Calendar
  lang // string => 'en' || 'fa'
  themeMode // string => 'dark' || 'light'
  value // string => format => 'YYYY-MM-DD' || 'jYYYY-jMM-jDD'
  onPress // function()
  showTodayButton // boolean
  render //string => 'icon' || 'input'
/>
```

## Some Code Examples lang = 'fa'

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="fa" // fa || en
      themeMode="light" // light || dark
      value={value}
      onPress={(fa, en) => {
        // fa => example => "1402-04-11"
        // en => example => "2021-06-24"
        setValue(fa);
      }}
      showTodayButton // boolean
      render="input" // 'input' || 'icon'
    />
  );
};

export default App;
```

## Some Code Examples lang = 'en'

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="en" // fa || en
      themeMode="light" // light || dark
      value={value}
      onPress={(en, fa) => {
        // en => example => "2021-06-24"
        // fa => example => "1402-04-11"
        setValue(en);
      }}
      showTodayButton // boolean
      render="input" // 'input' || 'icon'
    />
  );
};

export default App;
```

### Calendar Demo => fa

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-fa.gif?raw=true">
