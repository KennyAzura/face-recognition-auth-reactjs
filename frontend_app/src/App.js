import React from "react";
import "./css/App.css";
import { Auth } from "./components/Auth";
import { Loader } from "./components/Loader";
import { Route, Routes } from "react-router-dom";
import { AuthContainer } from "./containers/AuthContainer";
import { PrivateContainer } from "./containers/PrivateContainer";
import { Dashboard } from "./components/backoffice/Dashboard";
import { ManageTourist } from "./components/ManageTourist";
import { ManageEmployee } from "./components/ManageEmployee";
import {AttendanceEmployee} from "./components/AttendanceEmployee";

const App = () => {
  return (
    <div className="limiter">
      <Loader />
      <div
        className="container-login100"
        style={{ backgroundImage: "url(/images/bg.jpg)" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <AuthContainer>
                <Auth />
              </AuthContainer>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateContainer>
                <Dashboard />
              </PrivateContainer>
            }
          />
          <Route
            path="/manage-tourist"
            element={
              <PrivateContainer>
                <ManageTourist />
              </PrivateContainer>
            }
          />
          <Route
            path="/manage-employee"
            element={
              <PrivateContainer>
                <ManageEmployee />
              </PrivateContainer>
            }
          />
          <Route
            path="/attendance-employee"
            element={
              <PrivateContainer>
                <AttendanceEmployee />
              </PrivateContainer>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
