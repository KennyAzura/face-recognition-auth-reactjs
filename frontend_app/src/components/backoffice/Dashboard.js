import { useEffect, useState } from "react";
import "../../css/Dashboard.css";
import { Menu } from "./Menu";
import { BsFillCameraFill } from "react-icons/bs";
import { GET_COUNT_URL, GET_COUNT_URL_EMPLOYEES } from "../../config/api";
import axios from "axios";
import { LoaderSlim } from "../LoaderSlim";
import { FaChartArea, FaPeopleArrows } from "react-icons/fa";
import LineChart from "../Charts/LineChart";

export const Dashboard = () => {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const totalAreaNames = [...new Set(data.map((item) => item.name))].length;

  let totalCamera = data.map((item) => [item.name, item.camera]);
  totalCamera = [...new Set(totalCamera.map(JSON.stringify))].map(
    JSON.parse
  ).length;

  const newData = data
    .filter((t) => t.datetime.includes("_24"))
    .reduce((acc, t) => acc + t.totalCountIn, 0);

  const area1 = data
    .filter(
      (t) =>
        t.datetime.includes("_24") &&
        t.name.includes("1") &&
        t.camera.includes("1")
    )
    .sort((a, b) => {
      const dateA = a.datetime.split("_");
      const dateB = b.datetime.split("_");

      if (dateA[1] === dateB[1]) {
        return dateA[0] - dateB[0];
      }

      return dateA[1] - dateB[1];
    })
    .map((obj) => {
      const dateParts = obj.datetime.split("_");
      const modifiedDatetime = `${dateParts[0]}/${dateParts[1]}`;
      return { ...obj, datetime: modifiedDatetime };
    });

  const area2 = data
    .filter(
      (t) =>
        t.datetime.includes("_24") &&
        t.name.includes("2") &&
        t.camera.includes("1")
    )
    .sort((a, b) => {
      const dateA = a.datetime.split("_");
      const dateB = b.datetime.split("_");

      if (dateA[1] === dateB[1]) {
        return dateA[0] - dateB[0];
      }

      return dateA[1] - dateB[1];
    })
    .map((obj) => {
      const dateParts = obj.datetime.split("_");
      const modifiedDatetime = `${dateParts[0]}/${dateParts[1]}`;
      return { ...obj, datetime: modifiedDatetime };
    });

  const area3 = data
    .filter(
      (t) =>
        t.datetime.includes("_24") &&
        t.name.includes("3") &&
        t.camera.includes("1")
    )
    .sort((a, b) => {
      const dateA = a.datetime.split("_");
      const dateB = b.datetime.split("_");

      if (dateA[1] === dateB[1]) {
        return dateA[0] - dateB[0];
      }

      return dateA[1] - dateB[1];
    })
    .map((obj) => {
      const dateParts = obj.datetime.split("_");
      const modifiedDatetime = `${dateParts[0]}/${dateParts[1]}`;
      return { ...obj, datetime: modifiedDatetime };
    });

  useEffect(() => {
    axios.get(GET_COUNT_URL_EMPLOYEES).then((response) => {
      setEmployees(response.data);
    });
  }, []);

  useEffect(() => {
    fetch(GET_COUNT_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
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
            <div className="dashboard-container">
              <div className="dash-item">
                <div className="dash-img green">
                  <img
                    src="/images/income.png"
                    alt="icon in"
                    className="dash_item-img"
                  />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">
                    {((newData * 30000) / 1000000000).toFixed()}
                    <small> tỉ</small>
                  </h2>
                  <p className="dash-content-p">Tổng thu nhập</p>
                </div>
              </div>
              <div className="dash-item">
                <div
                  className="dash-img"
                  style={{
                    color: "white",
                    backgroundColor: "rgb(18, 72, 221)",
                  }}
                >
                  <FaPeopleArrows className="dash_item-img" />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">
                    {newData.toLocaleString("en-US")}
                  </h2>
                  <p className="dash-content-p">Tổng khách tham quan</p>
                </div>
              </div>
              <div className="dash-item">
                <div className="dash-img red">
                  <img
                    src="/images/tourists.png"
                    alt="icon in"
                    className="dash_item-img"
                    style={{ color: "#fff" }}
                  />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">{employees.length}</h2>
                  <p className="dash-content-p">Tổng số lượng nhân viên</p>
                </div>
              </div>
              <div className="dash-item">
                <div
                  className="dash-img"
                  style={{
                    color: "white",
                    backgroundColor: "rgb(5, 212, 254)",
                  }}
                >
                  <FaChartArea className="dash_item-img" />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">{totalAreaNames}</h2>
                  <p className="dash-content-p">Tổng số lượng khu du lịch</p>
                </div>
              </div>
              <div className="dash-item">
                <div className="dash-img yellow">
                  <BsFillCameraFill className="dash_item-img" />
                </div>
                <div className="dash-content">
                  <h2 className="dash-content-h">{totalCamera}</h2>
                  <p className="dash-content-p">Tổng số lượng camera</p>
                </div>
              </div>
            </div>
          </div>
          <LineChart area1={area1} area2={area2} area3={area3} />
        </div>
      </div>
    </div>
  );
};
