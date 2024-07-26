import React, { useState } from "react";
import moment from "moment-jalaali";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import Calendar from "./Calendar";

const Agenda = ({ lang = "en", themeMode = "dark", theme }) => {
  moment.locale(lang);
  if (lang == "fa") {
    moment.loadPersian({ dialect: "persian-modern" });
  }

  const setFormat = () => {
    if (lang == "fa") {
      return "jYYYY-jMM-jDD";
    }
    return "YYYY-MM-DD";
  };

  const themeCalendar = {
    dark: {
      background: theme?.dark?.background || "rgb(29, 27, 30)",
      onBackground: theme?.dark?.onBackground || "rgb(231, 225, 229)",
      disable: theme?.dark?.disable || "rgb(74, 69, 78)",
      selectedDateBgColor:
        theme?.dark?.selectedDateBgColor || "rgb(220, 184, 255)",
      selectedDateColor: theme?.dark?.selectedDateColor || "rgb(71, 12, 122)",
      todayBgColor: theme?.dark?.todayBgColor || "rgb(208, 193, 218)",
      todayColor: theme?.dark?.todayColor || "rgb(54, 44, 63)",
      borderColor: theme?.dark?.borderColor || "rgb(150, 142, 152)",
    },
    light: {
      background: theme?.light?.background || "rgb(255, 251, 255)",
      onBackground: theme?.light?.onBackground || "rgb(29, 27, 30)",
      disable: theme?.light?.disable || "rgb(233, 223, 235)",
      selectedDateBgColor:
        theme?.light?.selectedDateBgColor || "rgb(120, 69, 172)",
      selectedDateColor:
        theme?.light?.selectedDateColor || "rgb(255, 255, 255)",
      todayBgColor: theme?.light?.todayBgColor || "rgb(102, 90, 111)",
      todayColor: theme?.light?.todayColor || "rgb(255, 255, 255)",
      borderColor: theme?.light?.borderColor || "rgb(124, 117, 126)",
    },
  };

  const styles = StyleSheet.create({
    headerContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      marginBottom: 10,
    },
    headerBtnBox: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    headerBtn: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
  });

  const [selectedDate, setSelectedDate] = useState(
    moment().format(setFormat())
  );

  const getDaysBetweenDates = (props) => {
    const date = moment(props, setFormat()).format("YYYY-MM-DD");

    const startDate = moment(date)
      .startOf(lang == "fa" ? "jMonth" : "month")
      .format("YYYY-MM-DD");

    const endDate = moment(date)
      .endOf(lang == "fa" ? "jMonth" : "month")
      .format("YYYY-MM-DD");
    console.log("startDate", startDate);

    const timeDifference =
      new Date(startDate).getTime() - new Date(endDate).getTime();

    const daysDifference = Math.abs(timeDifference) / (1000 * 3600 * 24);

    const daysArray = [];

    for (let i = 0; i < 32; i += 1) {
      daysArray.push({
        agenda_id: `agenda_id_${i}`,
        dateString: moment(startDate).add(i, "day").format("YYYY-MM-DD"),
        month: moment(startDate).add(i, "day").format("MM"),
        day: moment(startDate).add(i, "day").format("DD"),
        year: moment(startDate).add(i, "day").format("YYYY"),
        child: [
          { child_id: `agenda_child_${i}_1`, title: "test 1" },
          { child_id: `agenda_child_${i}_2`, title: "test 2" },
          { child_id: `agenda_child_${i}_3`, title: "test 3" },
          { child_id: `agenda_child_${i}_4`, title: "test 4" },
        ],
      });
    }

    return daysArray;
  };

  const events = {
    "2024-07-25": [
      { date: "2024-07-25", title: "test 1" },
      { date: "2024-07-25", title: "test 2" },
    ],
    "2024-07-26": [
      { date: "2024-07-26", title: "test 3" },
      { date: "2024-07-26", title: "test 4" },
    ],
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        key={`renderItem_${index}`}
        style={{
          width: "100%",
          height: "auto",
          marginBottom: 10,
          backgroundColor: "#212529",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: themeCalendar[themeMode].onBackground,
            fontSize: 18,
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  const renderDay = ({ item, index }) => {
    return (
      <View>
        <View
          key={`renderDay_${index}`}
          style={{
            width: "100%",
            marginTop: 20,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#696969",
                fontSize: 40,
              }}
            >
              {moment(item.dateString).format(lang == "fa" ? "jD" : "D")}
            </Text>
            <Text
              style={{
                color: "#696969",
                fontSize: 25,
              }}
            >
              {moment(item.dateString).format(lang == "fa" ? "dddd" : "ddd")}
            </Text>
          </View>
          <FlatList
            data={item.child}
            renderItem={renderItem}
            keyExtractor={(item) => item.child_id}
            numColumns={1}
            contentContainerStyle={{ width: "100%" }}
            style={{ width: "70%" }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#343a40",
            // width: "100%",
            height: 2,
            marginVertical: 5,
            marginHorizontal: 20,
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <StatusBar />
      <View style={styles.headerContainer}>
        <View>
          <View style={{ position: "absolute", top: -20 }}>
            <Calendar
              themeMode={themeMode}
              onPress={(date1) => {
                setSelectedDate(date1);
              }}
              value={selectedDate}
              title="date"
              lang={lang}
              render="icon"
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              color: themeCalendar[themeMode].onBackground,
              fontSize: 20,
              marginLeft: 30,
            }}
          >
            {moment(selectedDate, setFormat()).format(
              lang == "fa" ? "jMMMM jYYYY" : "MMMM YYYY"
            )}
          </Text>
        </View>
        <View style={styles.headerBtnBox}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: themeCalendar[themeMode].borderColor,
            }}
            onPress={() => {
              const date = moment(selectedDate, setFormat()).format(
                "YYYY-MM-DD"
              );
              const startDate = moment(date)
                .startOf(lang == "fa" ? "jMonth" : "month")
                .format("YYYY-MM-DD");

              setSelectedDate(
                moment(startDate)
                  .subtract(1, lang == "fa" ? "jMonth" : "month")
                  .format(lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD")
              );
            }}
          >
            <Text style={{ color: themeCalendar[themeMode].onBackground }}>
              {lang == "fa" ? "قبل" : "Prev"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: themeCalendar[themeMode].borderColor,
            }}
            onPress={() => {
              setSelectedDate(moment().format(setFormat()));
            }}
          >
            <Text style={{ color: themeCalendar[themeMode].onBackground }}>
              {lang == "fa" ? "امروز" : "today"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: themeCalendar[themeMode].borderColor,
            }}
            onPress={() => {
              const date = moment(selectedDate, setFormat()).format(
                "YYYY-MM-DD"
              );

              const startDate = moment(date)
                .locale("en")
                .startOf(lang == "fa" ? "jMonth" : "month")
                .format("YYYY-MM-DD");

              setSelectedDate(
                moment(startDate)
                  .add(1, lang == "fa" ? "jMonth" : "month")
                  .format(lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD")
              );
            }}
          >
            <Text style={{ color: themeCalendar[themeMode].onBackground }}>
              {lang == "fa" ? "بعد" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={getDaysBetweenDates(selectedDate)}
        renderItem={renderDay}
        keyExtractor={(item) => item.agenda_id}
        numColumns={1}
        // contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Agenda;
