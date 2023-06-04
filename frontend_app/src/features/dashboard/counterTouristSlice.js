import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  datetime: "",
  listWeek: [],
  listMonth: [],
};

export const counterTouristSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDatetime: (state, action) => {
      state.datetime = action.payload;
    },
    setListWeek: (state, action) => {
      state.listWeek = action.payload;
    },
    setListMonth: (state, action) => {
      state.listMonth = action.payload;
    },
  },
});

export const getDatetime = (state) => state.counter.datetime;
export const getListWeek = (state) => state.counter.listWeek;
export const getListMonth = (state) => state.counter.listMonth;

export const { setDatetime, setListWeek, setListMonth } =
  counterTouristSlice.actions;

export default counterTouristSlice.reducer;
