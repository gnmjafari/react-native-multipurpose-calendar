import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import moment from "moment-jalaali";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const Calendar = ({
  lang = "en", // 'en' || 'fa'
  themeMode = "dark", // 'dark' || 'light'
  value, // string => format => 'YYYY-MM-DD' || 'jYYYY-jMM-jDD'
  onPress, // function
  showTodayButton = false, // boolean
  render = "input", // 'icon' || 'input'
  theme,
  title,
}) => {
  moment.locale(lang);
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
    mainContainer: {
      backgroundColor: themeCalendar[themeMode].background,
      minWidth: 330,
      maxWidth: 330,
      width: "100%",
      borderRadius: 15,
      marginVertical: 10,
      paddingTop: 20,
      paddingBottom: 10,
      zIndex: 2000,
      shadowColor: "#000000",

      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5,
    },
    itemHeader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      color: themeCalendar[themeMode].onBackground,
    },
    item: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      color: themeCalendar[themeMode].onBackground,
    },
  });

  const setFormat = () => {
    if (lang == "fa") {
      return "jYYYY-jMM-jDD";
    }
    return "YYYY-MM-DD";
  };

  const [show, setShow] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    moment().format(setFormat())
  );
  const [calendarValue, setCalendarValue] = useState(value || selectedDate);

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
      today: "امروز",
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

      today: "Today",
    },
  };

  const getDaysBetweenDates = (props) => {
    const date = moment(props, setFormat()).format("YYYY-MM-DD");

    const startDate = moment(date)
      .startOf(lang == "fa" ? "jMonth" : "month")
      .format("YYYY-MM-DD");

    const endDate = moment(date)
      .endOf(lang == "fa" ? "jMonth" : "month")
      .format("YYYY-MM-DD");

    let startWeek = moment(startDate)
      .startOf(lang == "fa" ? "jWeek" : "week")
      .format("YYYY-MM-DD");

    let endWeek = moment(endDate)
      .startOf(lang == "fa" ? "jWeek" : "week")
      .format("YYYY-MM-DD");

    if (lang == "fa" && moment(startDate).day() !== 6) {
      startWeek = moment(startDate)
        .subtract(moment(startDate).day() + 1, "days")
        .startOf("jWeek")
        .toDate();
    }

    if (lang == "fa" && moment(endDate).day() !== 5) {
      endWeek = moment(endDate)
        .add(6 - moment(endDate).day(), "days")
        .startOf(lang == "fa" ? "jWeek" : "week")
        .toDate();
    }

    const timeDifference =
      new Date(endWeek).getTime() - new Date(startWeek).getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    const daysArray = [];

    for (let i = 0; i < 42; i += 1) {
      daysArray.push({
        dateString: moment(startWeek).add(i, "day").format("YYYY-MM-DD"),
        month: moment(startWeek).add(i, "day").format("MM"),
        day: moment(startWeek).add(i, "day").format("DD"),
        year: moment(startWeek).add(i, "day").format("YYYY"),
      });
    }

    return daysArray;
  };

  const renderItem = ({ item, index }) => {
    const disable =
      moment(item.dateString).format(lang == "fa" ? "jMM" : "MM") !=
      moment(selectedDate, setFormat()).format(lang == "fa" ? "jMM" : "MM");

    const today =
      moment(item.dateString).format(
        lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
      ) == moment().format(setFormat());

    const selectedValueWithUser =
      calendarValue ==
      moment(item.dateString).format(
        lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
      );

    return (
      <View style={styles.item} key={`renderItem_${index}`}>
        <Text
          style={{
            borderRadius: 50,
            padding: 5,
            color: today
              ? themeCalendar[themeMode].todayColor
              : selectedValueWithUser
              ? themeCalendar[themeMode].selectedDateColor
              : disable
              ? themeCalendar[themeMode].disable
              : themeCalendar[themeMode].onBackground,
            backgroundColor: today
              ? themeCalendar[themeMode].todayBgColor
              : selectedValueWithUser
              ? themeCalendar[themeMode].selectedDateBgColor
              : themeCalendar[themeMode].background,
          }}
          onPress={() => {
            setShow(false);
            setCalendarValue(
              moment(item.dateString).format(
                lang == "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
              )
            );
            if (onPress) {
              onPress({
                en: moment(item.dateString).format("YYYY-MM-DD"),
                fa: moment(item.dateString).format("jYYYY-jMM-jDD"),
              });
            }
          }}
        >
          {moment(item.dateString).format(lang == "fa" ? "jDD" : "DD")}
        </Text>
      </View>
    );
  };
  const renderHeaderItem = ({ item, index }) => {
    const displayItem = item.length > 4 ? `${item.slice(0, 4)}...` : item;
    return (
      <View style={styles.itemHeader} key={`renderHeaderItem_${index}`}>
        <Text style={{ color: themeCalendar[themeMode].onBackground }}>
          {displayItem}
        </Text>
      </View>
    );
  };

  return (
    <>
      {render == "input" ? (
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: themeCalendar[themeMode].borderColor,
            backgroundColor: themeCalendar[themeMode].background,
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onPress={() => {
            setShow(!show);
          }}
        >
          <AntDesign
            name="calendar"
            size={25}
            color={themeCalendar[themeMode].onBackground}
          />
          {title && (
            <Text
              style={{
                marginHorizontal: 10,
                color: themeCalendar[themeMode].onBackground,
              }}
            >
              {title}
            </Text>
          )}
          <Text
            style={{
              marginHorizontal: 10,
              color: themeCalendar[themeMode].onBackground,
            }}
          >
            {calendarValue}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: themeCalendar[themeMode].background,
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          onPress={() => {
            setShow(!show);
          }}
        >
          <AntDesign
            name="calendar"
            size={30}
            color={themeCalendar[themeMode].onBackground}
          />
        </TouchableOpacity>
      )}
      {show && (
        <View style={styles.mainContainer}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 15,
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShow(false);
              }}
            >
              <AntDesign
                style={{ color: themeCalendar[themeMode].onBackground }}
                name="closecircleo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {showTodayButton && (
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
            )}
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                paddingLeft: 10,
                paddingVertical: 5,
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
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={themeCalendar[themeMode].onBackground}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                flexDirection: lang === "en" ? "row" : "row-reverse",
                color: themeCalendar[themeMode].onBackground,
              }}
            >
              <Text style={{ color: themeCalendar[themeMode].onBackground }}>
                {
                  useLocales[lang].monthNames[
                    moment(selectedDate, setFormat()).format(
                      lang === "fa" ? "jM" : "M"
                    ) - 1
                  ]
                }
              </Text>
              <Text style={{ color: themeCalendar[themeMode].onBackground }}>
                {moment(selectedDate, setFormat()).format(
                  lang === "fa" ? "jYYYY" : "YYYY"
                )}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingLeft: 10,
                paddingVertical: 5,
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
              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color={themeCalendar[themeMode].onBackground}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={useLocales[lang].dayNamesShort}
            renderItem={renderHeaderItem}
            keyExtractor={(item) => item}
            numColumns={7}
            contentContainerStyle={styles.container}
          />

          <FlatList
            data={getDaysBetweenDates(selectedDate)}
            renderItem={renderItem}
            keyExtractor={(item) => item.day}
            numColumns={7}
            style={styles.container}
          />
        </View>
      )}
    </>
  );
};

export default Calendar;
