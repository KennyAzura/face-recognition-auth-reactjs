import React, { useEffect, useState } from "react";
import { Menu } from "./backoffice/Menu";
import Calendar from "./Calendar";
import DataGridAttendanceEmployee from "./DataGridAttendanceEmployee";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../css/Manage.css";
import { GET_COUNT_URL, GET_COUNT_URL_EMPLOYEES } from "../config/api";
import { setEmployees } from "../features/dashboard/employeeSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { LoaderSlim } from "./LoaderSlim";

export const AttendanceEmployee = () => {
  const dispatch = useDispatch();

  const [totalTourist, setTotalTourist] = useState([]);
  const [area, setArea] = useState("Khu du lịch 1");
  const [camera, setCamera] = useState("Số 1");
  const [openArea, setOpenArea] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    axios.get(GET_COUNT_URL_EMPLOYEES).then((response) => {
      dispatch(setEmployees(response.data));
    });
  }, []);

  useEffect(() => {
    fetch(GET_COUNT_URL)
      .then((res) => res.json())
      .then((data) => {
        setTotalTourist(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container dashboard">
        <div className="row">
          <div className="col-lg-3 my-box left-side">
            <Menu />
          </div>
          <div className="col-lg-9 right-side">
            <div className="row flex-sb">
              <LoaderSlim status={isLoading} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-lg-3 my-box left-side">
          <Menu />
        </div>
        <div className="col-lg-9 right-side">
          <div className="row">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "1rem",
              }}
            >
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
            </div>
            <DataGridAttendanceEmployee area={area} camera={camera} />
          </div>
        </div>
      </div>
    </div>
  );
};
