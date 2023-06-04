import "../css/Manage.css";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import { GET_COUNT_URL } from "../config/api";
import React, { useEffect, useState } from "react";
import { getDatetime } from "../features/dashboard/counterTouristSlice";
import { Menu } from "./backoffice/Menu";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BarChart from "./BarChart";
import StaticsDay from "./StaticsDay";
import PieWeek from "./Charts/PieWeek";
import PieMonth from "./Charts/PieMonth";

export const ManageTourist = () => {
  const [totalTourist, setTotalTourist] = useState([]);
  const [area, setArea] = useState("Khu du lịch 1");
  const [camera, setCamera] = useState("Số 1");
  const [plot, setPlot] = useState("Ngày");
  const [openArea, setOpenArea] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [openPlot, setOpenPlot] = useState(false);

  const datetime = useSelector(getDatetime);

  // Week and month
  const filterCounterDay = totalTourist.filter((t) =>
    t.datetime.includes("_24")
  );

  // Day
  const filterHour = totalTourist.filter((t) => t.datetime.includes(datetime));

  const moment = require("moment");
  const now = moment();
  const weekNumber = now.isoWeek();
  const currentYear = moment().year();
  // Tính ngày bắt đầu của tuần
  const startOfWeek = moment()
    .year(currentYear)
    .isoWeek(weekNumber - 1)
    .startOf("isoWeek")
    .toDate();
  // Tính ngày kết thúc của tuần
  const endOfWeek = moment(startOfWeek).endOf("isoWeek").toDate();

  const listWeek = [];
  for (
    let day = startOfWeek;
    day <= endOfWeek;
    day.setDate(day.getDate() + 1)
  ) {
    // Tạo đối tượng Moment từ đối tượng obj
    const datetimeMoment = moment(day);
    const str_date = datetimeMoment.format("DD_MM_YYYY_24");
    for (let i = 0; i < filterCounterDay.length; i++) {
      if (str_date === filterCounterDay[i]["datetime"]) {
        listWeek.push(filterCounterDay[i]);
      } else {
        continue;
      }
    }
  }

  listWeek.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return a.camera.localeCompare(b.camera);
  });

  // Lấy tên của khu vực
  const uniqueNamesArea = [...new Set(totalTourist.map((item) => item.name))];

  // Lấy tên của camera
  const camerasForArea = [
    ...new Set(
      totalTourist
        .filter((item) => item.name === area)
        .map((item) => item.camera)
    ),
  ];

  const handleChangeArea = (event) => {
    setArea(event.target.value);
    setCamera((pre) => (camerasForArea.includes(pre) ? pre : "Số 1"));
  };

  const handleChangeCamera = (event) => {
    setCamera(event.target.value);
  };

  const handleChangePlot = (event) => {
    setPlot(event.target.value);
  };

  const handleOpenArea = () => {
    setOpenArea(true);
  };

  const handleCloseArea = () => {
    setOpenArea(false);
  };

  const handleOpenCamera = () => {
    setOpenCamera(true);
  };

  const handleCloseCamera = () => {
    setOpenCamera(false);
  };

  const handleOpenPlot = () => {
    setOpenPlot(true);
  };

  const handleClosePlot = () => {
    setOpenPlot(false);
  };

  useEffect(() => {
    fetch(GET_COUNT_URL)
      .then((res) => res.json())
      .then((data) => setTotalTourist(data));
  }, []);

  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-lg-3 my-box left-side">
          <Menu />
        </div>
        <div className="col-lg-9 right-side">
          <div className="row flex-sb">
            <div>
              <div>Khu vực</div>
              <FormControl sx={{ m: 1.5, minWidth: 200 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Area
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openArea}
                  onClose={handleCloseArea}
                  onOpen={handleOpenArea}
                  value={area}
                  label="Area"
                  onChange={handleChangeArea}
                >
                  {uniqueNamesArea.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Camera</div>
              <FormControl sx={{ m: 1.5, minWidth: 200 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Camera
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openCamera}
                  onClose={handleCloseCamera}
                  onOpen={handleOpenCamera}
                  value={camera}
                  label="Camera"
                  onChange={handleChangeCamera}
                >
                  {camerasForArea.map((camera) => (
                    <MenuItem key={camera} value={camera}>
                      {camera}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Ngày tháng</div>
              <Calendar />
            </div>
            <div className="chart">
              <StaticsDay
                filterCounterDay={filterCounterDay}
                area={area}
                camera={camera}
                datetime={datetime}
              />
              <div className="pie-chart">
                <div className="pie-week">
                  <PieWeek weekCurrent={weekNumber - 1} />
                </div>
                <div className="pie-month">
                  <PieMonth />
                </div>
              </div>
            </div>
            <div>
              <div>Biểu đồ thống kê</div>
              <FormControl sx={{ m: 1.5, minWidth: 200 }}>
                <InputLabel id="demo-controlled-open-select-label">
                  Options
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={openPlot}
                  onClose={handleClosePlot}
                  onOpen={handleOpenPlot}
                  value={plot}
                  label="Plotttttt"
                  onChange={handleChangePlot}
                >
                  {["Ngày", "Tuần", "Tháng"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <BarChart
                area={area}
                camera={camera}
                listWeek={listWeek}
                plot={plot}
                filterHour={filterHour}
                filterCounterDay={filterCounterDay}
                datetime={datetime}
                weekNumber={weekNumber - 1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
