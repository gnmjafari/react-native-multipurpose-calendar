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
import _ from "lodash";
import fa from "moment/src/locale/fa";
import Loading from "./Loading";

const useLocales = {
  fa: {
    monthNames: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    monthNamesShort: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    dayNames: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ],
    dayNamesShort: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
    ],
  },
  en: {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

const Agenda = ({
  lang = "en",
  themeMode = "dark",
  theme,
  events = [],
  fontFamily,
  renderItemCustom,
}) => {
  const eventsMemo = React.useMemo(() => {
    return events;
  }, [events]);
  const checkLang = React.useMemo(() => {
    if (lang == "fa") {
      moment.locale(lang, fa);
      moment.loadPersian({ dialect: "persian-modern" });
    } else {
      moment.locale(lang);
    }

    return true;
  }, [lang]);

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
      itemBgColor: theme?.dark?.itemBgColor || "rgb(220, 184, 255)",
      itemTextColor: theme?.dark?.itemTextColor || "rgb(71, 12, 122)",
      dayTextColor: theme?.dark?.dayTextColor || "rgb(231, 225, 229)",
      buttonBgColor: theme?.dark?.buttonBgColor || "rgb(77, 67, 87)",
      buttonTextColor: theme?.dark?.buttonTextColor || "rgb(237, 221, 246)",
      todayTextColor: theme?.dark?.todayTextColor || "rgb(220, 184, 255)",
      line: "rgb(74, 69, 78)",
    },
    light: {
      background: theme?.light?.background || "rgb(255, 251, 255)",
      onBackground: theme?.light?.onBackground || "rgb(29, 27, 30)",
      itemBgColor: theme?.dark?.itemBgColor || "rgb(120, 69, 172)",
      itemTextColor: theme?.dark?.itemTextColor || "rgb(231, 225, 229)",
      dayTextColor: theme?.dark?.dayTextColor || "#0D1B2A",
      buttonBgColor: theme?.dark?.buttonBgColor || "rgb(237, 221, 246)",
      buttonTextColor: theme?.dark?.buttonTextColor || "rgb(33, 24, 42)",
      todayTextColor: theme?.dark?.todayTextColor || "rgb(120, 69, 172)",
      line: "rgb(233, 223, 235)",
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
      gap: 5,
    },
    headerBtn: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    container: {
      // flex: 1,
      justifyContent: "flex-start",
      backgroundColor: themeCalendar[themeMode].background,
      paddingTop: 30,
      paddingBottom: 70,
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

    const timeDifference =
      new Date(startDate).getTime() - new Date(endDate).getTime();

    const daysDifference = Math.abs(timeDifference) / (1000 * 3600 * 24);

    const daysArray = [];

    for (let i = 0; i < 32; i += 1) {
      const dateAdd = moment(startDate).add(i, "day").format("YYYY-MM-DD");

      const filterEvents = _.filter(
        eventsMemo,
        (item) => item.date === dateAdd
      );

      const mapFilterData = _.map(filterEvents, (item) => ({
        ...item,
        child_id: `child_id_${i}_${item.id}`,
      }));

      daysArray.push({
        agenda_id: `agenda_id_${i}`,
        dateString: moment(startDate).add(i, "day").format("YYYY-MM-DD"),
        month: moment(startDate).add(i, "day").format("MM"),
        day: moment(startDate).add(i, "day").format("DD"),
        year: moment(startDate).add(i, "day").format("YYYY"),
        child: mapFilterData,
      });
    }

    return daysArray;
  };

  const renderItem = ({ item, index }) => {
    if (renderItemCustom != undefined) {
      return renderItemCustom({ item, index });
    }
    return (
      <View
        key={`renderItem_${index}`}
        style={{
          width: "100%",
          height: "auto",
          marginBottom: 10,
          backgroundColor: themeCalendar[themeMode].itemBgColor,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: themeCalendar[themeMode].itemTextColor,
            fontSize: 18,
            fontFamily: fontFamily,
          }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  const renderDay = ({ item, index }) => {
    const today =
      moment(item.dateString).format(
        lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
      ) == moment().format(setFormat());
    return (
      <View key={`renderDay_${index}`}>
        <View
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
                color: today
                  ? themeCalendar[themeMode].todayTextColor
                  : themeCalendar[themeMode].dayTextColor,
                fontSize: 40,
                fontFamily: fontFamily,
              }}
            >
              {moment(item.dateString).format(lang == "fa" ? "jD" : "D")}
            </Text>
            <Text
              style={{
                color: today
                  ? themeCalendar[themeMode].todayTextColor
                  : themeCalendar[themeMode].dayTextColor,
                fontSize: 25,
                fontFamily: fontFamily,
              }}
            >
              {moment(item.dateString).format(lang == "fa" ? "dddd" : "ddd")}
            </Text>
          </View>
          {item.child && item.child.length > 0 && (
            <FlatList
              data={item.child}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.child_id}_renderItem`}
              numColumns={1}
              contentContainerStyle={{ width: "100%" }}
              style={{ width: "70%" }}
            />
          )}
        </View>
        <View
          style={{
            backgroundColor: themeCalendar[themeMode].line,
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
    <>
      {checkLang ? (
        <>
          <View style={styles.container}>
            <StatusBar />
            <View style={styles.headerContainer}>
              <View>
                <View style={{ position: "absolute", top: -20 }}>
                  <Calendar
                    themeMode={themeMode}
                    onPress={({ en, fa }) => {
                      if (lang == "fa") {
                        setSelectedDate(fa);
                      } else {
                        setSelectedDate(en);
                      }
                    }}
                    value={selectedDate}
                    title="date"
                    lang={lang}
                    render="icon"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  marginLeft: 40,
                }}
              >
                <Text
                  style={{
                    color: themeCalendar[themeMode].onBackground,
                    fontSize: 20,

                    fontFamily: fontFamily,
                  }}
                >
                  {
                    useLocales[lang].monthNamesShort[
                      moment(selectedDate, setFormat()).format(
                        lang == "fa" ? "jM" : "M"
                      ) - 1
                    ]
                  }
                </Text>
                <Text
                  style={{
                    color: themeCalendar[themeMode].onBackground,
                    fontSize: 20,

                    fontFamily: fontFamily,
                  }}
                >
                  {moment(selectedDate, setFormat()).format(
                    lang == "fa" ? "jYYYY" : "YYYY"
                  )}
                </Text>
              </View>
              <View style={styles.headerBtnBox}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: themeCalendar[themeMode].buttonBgColor,
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
                  <Text
                    style={{
                      color: themeCalendar[themeMode].buttonTextColor,
                      fontFamily: fontFamily,
                    }}
                  >
                    {lang == "fa" ? "قبل" : "Prev"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: themeCalendar[themeMode].buttonBgColor,
                  }}
                  onPress={() => {
                    setSelectedDate(moment().format(setFormat()));
                  }}
                >
                  <Text
                    style={{
                      color: themeCalendar[themeMode].buttonTextColor,
                      fontFamily: fontFamily,
                    }}
                  >
                    {lang == "fa" ? "امروز" : "today"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 5,
                    backgroundColor: themeCalendar[themeMode].buttonBgColor,
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
                  <Text
                    style={{
                      color: themeCalendar[themeMode].buttonTextColor,
                      fontFamily: fontFamily,
                    }}
                  >
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
        </>
      ) : (
        <Loading color={themeCalendar[themeMode].itemBgColor} />
      )}
    </>
  );
};

export default Agenda;
