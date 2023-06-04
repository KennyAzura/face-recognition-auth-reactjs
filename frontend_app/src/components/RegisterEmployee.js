import React, { useState } from "react";
import "../css/Register.css";
import { IoCloseSharp } from "react-icons/io5";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

const RegisterEmployee = ({ handleAddEmployee }) => {
  const manageForm = () => {};

  const [file, setFile] = useState();
  const handleChangeFile = (newFile) => {
    setFile(newFile);
  };
  return (
    <form className="employee-wrapper">
      <div className="camera-e"></div>
      <div className="employee-container">
        <div className="add">
          <h3 className="add-e">Thêm nhân viên</h3>
          <button onClick={handleAddEmployee} className="icon">
            <IoCloseSharp />
          </button>
        </div>
        <div>
          <div className="employee-body">
            <TextField
              id="standard-basic"
              label="Họ và tên"
              variant="standard"
            />
            <TextField id="standard-basic" label="Email" variant="standard" />
            <TextField
              id="standard-basic"
              label="Số điện thoại"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Ngày sinh"
              variant="standard"
            />
          </div>
          <TextField
            id="standard-basic"
            label="Địa chỉ"
            variant="standard"
            sx={{ width: "98%", ml: 2, mb: 3, mt: 4 }}
          />
          <div className="employee-body margin">
            <Typography
              variant="body1"
              component="h6"
              mt={-0.5}
              sx={{ width: "105%" }}
            >
              Chọn hình ảnh khuôn mặt
              <MuiFileInput
                value={file}
                size="small"
                onChange={handleChangeFile}
                variant="standard"
                placeholder="Chọn file"
                sx={{ mt: 1 }}
              />
            </Typography>
            <FormControl sx={{ ml: 1 }}>
              <FormLabel id="demo-radio-buttons-group-label">
                Giới tính
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            component="label"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              width: "40%",
              height: "3rem",
              mt: "3rem",
              ml: "30%",
            }}
            onClick={(e) => manageForm(e)}
          >
            Thêm nhân viên
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterEmployee;
