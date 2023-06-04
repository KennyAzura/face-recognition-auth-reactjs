import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    deleteEmployees: (state, action) => {
      const ids = action.payload;
      state.employees = state.employees.filter((e) => !ids.includes(e._id));
    },
  },
});

export const getEmployees = (state) => state.employee.employees;

export const { setEmployees, deleteEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
