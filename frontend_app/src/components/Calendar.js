import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDatetime } from '../features/dashboard/counterTouristSlice';
import {TextField} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatDatetime } from "../config/formatDatetime";

const Calendar = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(new Date());

  const handleDatetime = (datetime) => {
    const formattedDate = formatDatetime(datetime)
    setValue(datetime)
    dispatch(setDatetime(formattedDate));
  };


  useEffect(() => {
    const formattedDate = formatDatetime(value)
    dispatch(setDatetime(formattedDate))
  }, [value])
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} > 
       <DatePicker
        sx={{m: 1.5, textAlign: 'center', width: 160}}
        variant='static'
        orientation='portrait'
        value={value}
        disableFuture
        label='Datetime'
        onChange={(newValue) => handleDatetime(newValue)}
        format="dd/MM/yyyy"
        TextField={(params) => {
          <TextField {...params} />;
        }}
  
      />
    </LocalizationProvider>
  );
};

export default Calendar;