import React from "react";

const StaticsDay = ({ filterCounterDay, area, camera, datetime }) => {
  let newValue = filterCounterDay
    .filter(
      (item) =>
        item.name === area &&
        item.camera === camera &&
        item.datetime === datetime + "_24"
    )
    .map((item) => [item.totalCountIn, item.totalCountOut]);

  newValue = newValue.flat();

  let oldValue = filterCounterDay
    .filter(
      (item) =>
        item.name === area &&
        item.camera === camera &&
        item.datetime === getPreviousDate(datetime)
    )
    .map((item) => [item.totalCountIn, item.totalCountOut]);

  oldValue = oldValue.flat();

  function getPreviousDate(date) {
    const moment = require("moment");

    const inputDate = moment(date, "DD_MM_YYYY");

    const previousDate = inputDate.subtract(1, "days");

    const previousDateFormatted = previousDate.format("DD_MM_YYYY");

    return previousDateFormatted + "_24";
  }
  const totalCountInPercent = (
    (newValue[0] - oldValue[0]) /
    oldValue[0]
  ).toFixed(2);

  const totalCountOutPercent = (
    (newValue[1] - oldValue[1]) /
    oldValue[1]
  ).toFixed(2);
  return (
    <>
      {filterCounterDay
        .filter(
          (item) =>
            area === item.name &&
            camera === item.camera &&
            datetime + "_24" ===
              (item.datetime.length === 12
                ? "0" + item.datetime
                : item.datetime)
        )
        .map((item) => (
          <div key={item._id} className="total">
            <div className="total_item">
              <div className="total-img-green">
                <img
                  src="/images/in.png"
                  alt="icon in"
                  className="total_item-img"
                />
              </div>
              <div className="amount">
                <div className="count">
                  <h1>{item.totalCountIn.toLocaleString('en-US')}</h1>
                  {totalCountInPercent > 0 ? (
                    <span className="count_percent inc">
                      <img
                        src="/images/inc.png"
                        alt="icon out"
                        className="count_percent-icon"
                      />
                      {totalCountInPercent}%
                    </span>
                  ) : (
                    <span className="count_percent dec">
                      <img
                        src="/images/dec.png"
                        alt="icon out"
                        className="count_percent-icon"
                      />
                      {Math.abs(totalCountInPercent)}%
                    </span>
                  )}
                </div>
                <span>Tổng khách du lịch vào trong ngày</span>
              </div>
            </div>
            <div className="total_item total_item-2">
              <div className="total-img-red">
                <img
                  src="/images/out.png"
                  alt="icon out"
                  className="total_item-img"
                />
              </div>
              <div className="amount">
                <div className="count">
                  <h1>{item.totalCountOut.toLocaleString('en-US')}</h1>
                  {totalCountOutPercent > 0 ? (
                    <span className="count_percent inc">
                      <img
                        src="/images/inc.png"
                        alt="icon out"
                        className="count_percent-icon"
                      />
                      {totalCountOutPercent}%
                    </span>
                  ) : (
                    <span className="count_percent dec">
                      <img
                        src="/images/dec.png"
                        alt="icon out"
                        className="count_percent-icon"
                      />
                      {Math.abs(totalCountOutPercent)}%
                    </span>
                  )}
                </div>
                <span>Tổng khách du lịch ra trong ngày</span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default StaticsDay;
