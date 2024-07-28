# react-native-multipurpose-calendar

## Getting started

`npm install react-native-multipurpose-calendar --save`

## Usage Calendar

```javascript
import { calendar } from "react-native-multipurpose-calendar";
```

```javascript
<Calendar lang themeMode value onPress showTodayButton render theme title />
```

## Some Code Examples Calendar lang = 'fa'

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="fa"
      themeMode="dark"
      title="date"
      value={value}
      onPress={({ en, fa }) => {
        setValue(fa);
      }}
      showTodayButton
      render="input"
    />
  );
};

export default App;
```

## Some Code Examples Calendar lang = 'en'

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="en"
      themeMode="dark"
      title="date"
      value={value}
      onPress={({ en, fa }) => {
        setValue(en);
      }}
      showTodayButton
      render="input"
    />
  );
};

export default App;
```

## Some Code Examples Calendar Theme

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <Calendar
      lang="fa"
      themeMode="dark"
      title='date'
      value={value}
      onPress={({fa, en}) => {
        setValue(fa);
      }}
      showTodayButton
      render="input"
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

### Options Calendar

| Param           | Type     | Default     | Description                        | Example                  |
| --------------- | -------- | ----------- | ---------------------------------- | ------------------------ |
| lang            | String   | `en`        | Available values = `en`, `fa`      | `lang="en"`              |
| title           | String   | `undefined` |                                    | `title="date"`           |
| themeMode       | String   | `dark`      | Available values = `dark`, `light` | `themeMode="light"`      |
| render          | String   | `input`     | Available values = `input`, `icon` | `render="icon"`          |
| showTodayButton | Boolean  | `false`     | Back to today's date               | `showTodayButton={true}` |
| value           | String   | `""`        | selected date `"YYYY-MM-DD"`       | `value={selectedDate}`   |
| onPress         | Function | `undefined` | ()=>{}                             | `({en, fa})=>{}`         |
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

## Usage Agenda

```javascript
import { Agenda } from "react-native-multipurpose-calendar";
```

```javascript
<Agenda lang themeMode events renderItemCustom fontFamily theme />
```

## Some Code Examples Agenda lang = 'fa'

```javascript
import React, { useState } from "react";
import { Agenda } from "react-native-multipurpose-calendar";

const App = () => {
  const [events, setEvents] = useState([
    {
      title: "test fa",
      date: "2024-06-21",
    },
  ]);

  return <Agenda lang="fa" themeMode="dark" events={events} />;
};

export default App;
```

## Some Code Examples Agenda lang = 'en'

```javascript
import React, { useState } from "react";
import { Agenda } from "react-native-multipurpose-calendar";

const App = () => {
  const [events, setEvents] = useState([
    {
      title: "test en",
      date: "2024-06-21",
    },
  ]);

  return <Agenda lang="en" themeMode="dark" events={events} />;
};

export default App;
```

## Some Code Examples Calendar Theme

```javascript
import React, { useState } from "react";
import { calendar } from "react-native-multipurpose-calendar";

const App = () => {
  const [events, setEvents] = useState([
    {
      title: "test theme",
      date: "2024-06-21",
    },
  ]);

  return (
    <Calendar
      lang="en"
      themeMode="light"
      events={events}
      theme={
        dark: {
          background:  "rgb(29, 27, 30)",
          onBackground: "rgb(231, 225, 229)",
          itemBgColor:  "rgb(220, 184, 255)",
          itemTextColor: "rgb(71, 12, 122)",
          dayTextColor:  "rgb(231, 225, 229)",
          buttonBgColor:  "rgb(77, 67, 87)",
          buttonTextColor:  "rgb(237, 221, 246)",
          todayTextColor:  "rgb(220, 184, 255)",
          line: "rgb(74, 69, 78)",
        },
        light: {
          background:  "rgb(255, 251, 255)",
          onBackground:  "rgb(29, 27, 30)",
          itemBgColor:  "rgb(120, 69, 172)",
          itemTextColor:  "rgb(231, 225, 229)",
          dayTextColor:  "#0D1B2A",
          buttonBgColor:  "rgb(237, 221, 246)",
          buttonTextColor:  "rgb(33, 24, 42)",
          todayTextColor:  "rgb(120, 69, 172)",
          line: "rgb(233, 223, 235)",
        },
    }
    />
  );
};

export default App;
```

## Some Code Examples renderItemCustom

```javascript
import React, { useState } from "react";
import { Agenda } from "react-native-multipurpose-calendar";
import { View, Text } from "react-native";

const App = () => {
  const [events, setEvents] = useState([
    {
      title: "test en",
      date: "2024-06-21",
    },
  ]);

  const renderItemCustom = ({ item, index }) => {
    return (
      <View key={`renderItem_${index}`}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <Agenda
      lang="en"
      themeMode="dark"
      events={events}
      renderItemCustom={renderItemCustom}
    />
  );
};

export default App;
```

### Options Calendar

| Param            | Type     | Default     | Description                        | Example                   |
| ---------------- | -------- | ----------- | ---------------------------------- | ------------------------- |
| lang             | String   | `en`        | Available values = `en`, `fa`      | `lang="en"`               |
| themeMode        | String   | `dark`      | Available values = `dark`, `light` | `themeMode="light"`       |
| fontFamily       | String   | `undefined` |                                    | `fontFamily="Montserrat"` |
| events           | Array    | `[]`        | `"[{title:'', date:''}]"`          |                           |
| renderItemCustom | Function | `undefined` | ()=>{}                             |                           |
| theme            | Object   |             | theme:{dark:{...},light:{...}}     |                           |

## License

React native multipurpose calendar is MIT licensed
