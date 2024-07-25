# react-native-multipurpose-calendar

## Getting started

`npm install react-native-multipurpose-calendar --save`

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
  theme
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
      themeMode="dark" // light || dark
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
      themeMode="dark" // light || dark
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

## Some Code Examples Theme

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="fa" // fa || en
      themeMode="dark" // light || dark
      value={value}
      onPress={(fa, en) => {
        // fa => example => "1402-04-11"
        // en => example => "2021-06-24"
        setValue(fa);
      }}
      showTodayButton // boolean
      render="input" // 'input' || 'icon'
      theme={
            dark: {
              background: "rgb(29, 27, 30)",
              onBackground: "rgb(231, 225, 229)",
              disable: "rgb(74, 69, 78)",
              selectedDateBgColor: "rgb(220, 184, 255)",
              selectedDateColor: "rgb(71, 12, 122)",
              todayBgColor: "rgb(208, 193, 218)",
              todayColor: "rgb(54, 44, 63)",
              borderColor: "rgb(150, 142, 152)",
            },
            light: {
              background: "rgb(255, 251, 255)",
              onBackground: "rgb(29, 27, 30)",
              disable: "rgb(233, 223, 235)",
              selectedDateBgColor: "rgb(120, 69, 172)",
              selectedDateColor: "rgb(255, 255, 255)",
              todayBgColor: "rgb(102, 90, 111)",
              todayColor: "rgb(255, 255, 255)",
              borderColor: "rgb(124, 117, 126)",
            },
     }
    />
  );
};

export default App;
```

### Options

| Param           | Type     | Default     | Description                        | Example                  |
| --------------- | -------- | ----------- | ---------------------------------- | ------------------------ |
| lang            | String   | `en`        | Available values = `en`, `fa`      | `lang="en"`              |
| themeMode       | String   | `dark`      | Available values = `dark`, `light` | `themeMode="light"`      |
| render          | String   | `input`     | Available values = `input`, `icon` | `render="icon"`          |
| showTodayButton | Boolean  | `false`     | Back to today's date               | `showTodayButton={true}` |
| value           | String   | `""`        | selected date `"YYYY-MM-DD"`       | `value={selectedDate}`   |
| onPress         | Function | `undefined` | ()=>{}                             | `(date_1, date_2)=>{}`   |
| theme           | Object   |             | theme:{dark:{...},light:{...}}     |                          |

### Calendar Demo : fa (persian)

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-fa.gif?raw=true" style="width: 300px; height: auto;">

### Calendar Demo : en (english)

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-en.gif?raw=true" style=" width: 300px; height: auto;">

### Calendar Demo light

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-light.gif?raw=true" style=" width: 300px; height: auto;">

### Calendar Demo today button

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-today-btn.gif?raw=true" style="width: 300px; height: auto;">

### Calendar Demo render icon

  <img src="https://github.com/gnmjafari/react-native-multipurpose-calendar/blob/main/demo/calendar-icon.gif?raw=true" style="width: 300px; height: auto;">

## License

React native multipurpose calendar is MIT licensed
