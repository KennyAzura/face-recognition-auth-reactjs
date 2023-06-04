import React, { useEffect } from "react";
import { Menu } from "./backoffice/Menu";
import DataGridEmployee from "./DataGridEmployee";
import { GET_COUNT_URL_EMPLOYEES } from "../config/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmployees } from "../features/dashboard/employeeSlice";

export const ManageEmployee = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(GET_COUNT_URL_EMPLOYEES).then((response) => {
      dispatch(setEmployees(response.data));
    });
  }, []);

  return (
    <div className="container dashboard">
      <div className="row">
        <div className="col-lg-3 my-box left-side">
          <Menu />
        </div>
        <div className="col-lg-9 right-side">
          <div className="row">
            <DataGridEmployee />
          </div>
        </div>
      </div>
    </div>
  );
};
