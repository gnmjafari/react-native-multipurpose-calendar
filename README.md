
# react-native-multipurpose-calendar

## Getting started

`$ npm install react-native-multipurpose-calendar --save`

### Mostly automatic installation

`$ react-native link react-native-multipurpose-calendar`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-multipurpose-calendar` and add `RNReactNativeMultipurposeCalendar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeMultipurposeCalendar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeMultipurposeCalendarPackage;` to the imports at the top of the file
  - Add `new RNReactNativeMultipurposeCalendarPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-multipurpose-calendar'
  	project(':react-native-multipurpose-calendar').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-multipurpose-calendar/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-multipurpose-calendar')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNReactNativeMultipurposeCalendar.sln` in `node_modules/react-native-multipurpose-calendar/windows/RNReactNativeMultipurposeCalendar.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using React.Native.Multipurpose.Calendar.RNReactNativeMultipurposeCalendar;` to the usings at the top of the file
  - Add `new RNReactNativeMultipurposeCalendarPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import {calendar} from 'react-native-multipurpose-calendar';
```
  