import React, { useEffect } from "react";
import BarDay from "./Charts/BarDay";
import BarWeek from "./Charts/BarWeek";
import BarMonth from "./Charts/BarMonth";
import { useDispatch } from "react-redux";
import { setListMonth, setListWeek } from "../features/dashboard/counterTouristSlice";

const BarChart = ({
  area,
  camera,
  listWeek,
  plot,
  filterHour,
  filterCounterDay,
  datetime,
  weekNumber,
}) => {
  const dispatch = useDispatch();

  // Week
  let newListWeek = listWeek
    .filter((item) => item.name === area && item.camera === camera)
    .map((item) => item);

  // Hour
  let newFilterHour = filterHour
    .filter((item) => item.name === area && item.camera === camera)
    .map((item) => item);

  let hoursLabel = newFilterHour
    .map((item) => parseInt(item.datetime.split("_").slice(-1)[0]))
    .sort((a, b) => a - b);
  hoursLabel = hoursLabel.map((item) => item.toString() + ":00");

  // Month
  const monthLabel = datetime.split("_")[1];

  let newListMonth = filterCounterDay.filter(
    (item) =>
      item.name === area &&
      item.camera === camera &&
      item.datetime.includes("_" + monthLabel)
  );
  
  const dayLabel = newListMonth
    .map((item) => parseInt(item.datetime.split("_")[0]))
    .sort((a, b) => a - b);

  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  newFilterHour = newFilterHour.map((item, index) => {
    return {
      ...item,
      hour: hoursLabel[index],
    };
  });

  newListWeek = newListWeek.map((item, index) => {
    return {
      ...item,
      day: days[index],
    };
  });

  newListMonth = newListMonth.map((item, index) => {
    return {
      ...item,
      dayMonth: dayLabel[index].toString() + "/" + monthLabel.slice(-1)[0],
    };
  });

  useEffect(() => {
    dispatch(setListWeek(newListWeek))
    dispatch(setListMonth(newListMonth))
  }, [newListWeek,newListMonth])

  return (
    (plot === "Ngày" && <BarDay data={newFilterHour} />) ||
    (plot === "Tuần" && (
      <BarWeek data={newListWeek} weekNumber={weekNumber} />
    )) ||
    (plot === "Tháng" && <BarMonth data={newListMonth} monthLabel={monthLabel}/>)
  );
};

export default BarChart;
