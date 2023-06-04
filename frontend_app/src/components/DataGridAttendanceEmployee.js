import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { Avatar, Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../features/dashboard/employeeSlice";
import { GET_ATTENDANCE_URL_EMPLOYEES } from "../config/api";
import { getDatetime } from "../features/dashboard/counterTouristSlice";
import { convertName } from "../config/convertName";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

export default function DataGridEmployee({ area, camera }) {
  const dispatch = useDispatch();

  const employees = useSelector(getEmployees);
  const datetime = useSelector(getDatetime);
  console.log(datetime);
  const [data, setData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const moment = require("moment");

  const newAttendanceDataIn = attendanceData
    .filter((item) => item.type === "goin")
    .map((item) => {
      const date = moment(item.timestamp).format("DD_MM_YYYY");
      const hour = moment.utc(item.timestamp).format("HH:mm:ss");
      return { ...item, date, inHour: hour };
    });

  const newAttendanceDataOut = attendanceData
    .filter((item) => item.type === "goout")
    .map((item) => {
      const date = moment(item.timestamp).format("DD_MM_YYYY");
      const hour = moment.utc(item.timestamp).format("HH:mm:ss");
      return { ...item, date, outHour: hour };
    });

  const newData = data.map((item) => {
    const matchItemIn = newAttendanceDataIn.find(
      (item1) => item1.identity === convertName(item.fullName)
    );
    const matchItemOut = newAttendanceDataOut.find(
      (item1) => item1.identity === convertName(item.fullName)
    );
    const areaVideo = [
      ...new Set(newAttendanceDataIn.map((item) => item.area)),
    ];

    const cameraVideo = [
      ...new Set(newAttendanceDataIn.map((item) => item.camera)),
    ];

    const dateVideo = [
      ...new Set(newAttendanceDataIn.map((item) => item.date)),
    ];

    return {
      ...item,
      ...matchItemIn,
      ...matchItemOut,
      area: areaVideo[0],
      camera: cameraVideo[0],
      date: dateVideo[0],
    };
  });

  const newDataFilter = newData
    .filter(
      (item) =>
        item.area === area && item.camera === camera && item.date === datetime
    )
    .map((item) => {
      const startTime = moment(item.inHour, "HH:mm:ss");
      const endTime = moment(item.outHour, "HH:mm:ss");
      const duration = moment.duration(endTime.diff(startTime));
      const totalHours = duration.hours();
      const totalMinutes = duration.minutes();
      let totalHoursWork = totalHours + ":" + totalMinutes;
      const hoursSplit = totalHoursWork.split(":");
      const hoursWork = parseInt(hoursSplit[0]) + parseInt(hoursSplit[1]) / 60;
      const hourlyRate = 30000;
      const salary = parseInt(
        (hoursWork * hourlyRate).toFixed()
      ).toLocaleString("en-US");

      if (isNaN(totalHours) || isNaN(totalMinutes)) {
        totalHoursWork = "NaT";
      } else if (totalMinutes === 0) {
        totalHoursWork = totalHours + " giờ ";
      } else if (totalHours === 0) {
        totalHoursWork = totalMinutes + " phút ";
      } else {
        totalHoursWork = totalHours + " giờ " + totalMinutes + " phút";
      }

      return {
        ...item,
        totalHoursWork,
        salary,
      };
    });
  console.log(newDataFilter);

  const handleStatus = newDataFilter.map((item) =>
    item.identity ? (item.status = "active") : (item.status = null)
  );

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   width: 300,
    // },
    {
      field: "avatarUrl",
      headerName: "Hình ảnh",
      width: 80,
      renderCell: (params) => <Avatar src={params.row.avatarUrl} />,
    },
    {
      field: "fullName",
      headerName: "Họ tên",
      width: 250,
      editable: true,
    },
    {
      field: "Sex",
      headerName: "Giới tính",
      width: 130,
      editable: true,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value === "active" ? (
            <Chip
              label="Đã đi làm"
              style={{
                color: "green",
                fontWeight: "bold",
                backgroundColor: "transparent",
                border: "3px solid green",
              }}
              icon={
                <CheckCircleIcon
                  style={{
                    color: "green",
                  }}
                />
              }
            />
          ) : (
            <Chip
              label="Không đi làm"
              style={{
                color: "red",
                fontWeight: "bold",
                backgroundColor: "transparent",
                border: "3px solid red",
              }}
              icon={
                <WarningIcon
                  style={{
                    color: "red",
                  }}
                />
              }
            />
          )}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Ngày tháng",
      width: 200,
      editable: true,
    },
    {
      field: "inHour",
      headerName: "Đi làm",
      width: 200,
      editable: true,
    },
    {
      field: "outHour",
      headerName: "Đi về",
      width: 200,
      editable: true,
    },
    {
      field: "totalHoursWork",
      headerName: "Tổng giờ làm",
      width: 200,
      editable: true,
    },
    {
      field: "salary",
      headerName: "Tiền lương",
      width: 200,
      editable: true,
    },
  ];

  useEffect(() => {
    setData(employees);
  }, [employees]);

  useEffect(() => {
    fetch(GET_ATTENDANCE_URL_EMPLOYEES)
      .then((res) => res.json())
      .then((data) => setAttendanceData(data));
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        {...newDataFilter}
        initialState={{
          ...newDataFilter.initialState,
          pagination: { paginationModel: { pageSize: 7 } },
        }}
        pageSizeOptions={[7, 50, 100]}
        rowHeight={75}
        columns={columns}
        rows={newDataFilter}
        getRowId={(row) => row._id}
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
