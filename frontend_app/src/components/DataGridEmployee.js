import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { Avatar, Box, Button } from "@mui/material";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployees,
  getEmployees,
} from "../features/dashboard/employeeSlice";
import RegisterEmployee from "./RegisterEmployee";

export default function DataGridEmployee() {
  const dispatch = useDispatch();

  const employees = useSelector(getEmployees);
  const [addEmployee, setAddEmployee] = useState(false);
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);

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
    { field: "Sex", headerName: "Giới tính", width: 200, editable: true },
    {
      field: "dateBirth",
      headerName: "Ngày sinh",
      width: 200,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Số điện thoại",
      type: "email",
      width: 300,
      editable: true,
    },
  ];

  const handleDeleteAll = () => {
    dispatch(deleteEmployees(ids));
  };

  const handleAddEmployee = () => {
    setAddEmployee(!addEmployee);
  };

  useEffect(() => {
    setData(employees);
  }, [employees]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {addEmployee && <RegisterEmployee handleAddEmployee={handleAddEmployee}/>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<IoPersonAddSharp />}
          onClick={handleAddEmployee}
        >
          Thêm nhân viên
        </Button>
        <Button
          variant="contained"
          startIcon={<RiDeleteBin6Fill />}
          onClick={handleDeleteAll}
        >
          Xóa nhân viên
        </Button>
      </Box>
      <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 7 } },
        }}
        pageSizeOptions={[7, 50, 100]}
        rowHeight={75}
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        checkboxSelection
        disableSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setIds(ids);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
