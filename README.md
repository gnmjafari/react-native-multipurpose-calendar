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

### Options

| Param            | Type     | Default   | Description                               | Example                  |
| ---------------- | -------  | -------   | ----------------------------------------  | ------------------------ |
| lang             | String   |   `en`    | Available values = `en`, `fa`             | `lang="en"`              |
| themeMode        | String   |  `dark`   | Available values = `dark`, `light`        | `themeMode="light"`      |
| render           | String   |  `input`  | Available values = `input`, `icon`        | `render="icon"`          |
| showTodayButton  | Boolean  |  `false`  | Back to today's date                      | `showTodayButton={true}` |
| value            | String   |   `""`    | selected date                             | `value={selectedDate}`   |
| onPress          | Function |`undefined`| ()=>{}                                    | `(date_1, date_2)=>{}`   |

### Calendar Demo : fa (persian)

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-fa.gif?raw=true" style="width: 30%; height: auto;">

### Calendar Demo : en (english)

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-en.gif?raw=true" style="width: 30%; height: auto;">

### Calendar Demo light

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-light.gif?raw=true" style="width: 30%; height: auto;">

### Calendar Demo today button

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-today-btn.gif?raw=true" style="width: 30%; height: auto;">

### Calendar Demo render icon

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-icon.gif?raw=true" style="width: 30%; height: auto;">

## License

React native multipurpose calendar is MIT licensed
