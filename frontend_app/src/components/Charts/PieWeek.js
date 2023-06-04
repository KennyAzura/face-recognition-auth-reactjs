import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
  Inject,
} from "@syncfusion/ej2-react-charts";
import { useSelector } from "react-redux";
import { getListWeek } from "../../features/dashboard/counterTouristSlice";

function PieWeek({weekCurrent}) {
  const listWeek = useSelector(getListWeek);

  let totalListWeek = listWeek.reduce(
    (total, item) => {
      total.totalCountIn += item.totalCountIn;
      total.totalCountOut += item.totalCountOut;
      return total;
    },
    { totalCountIn: 0, totalCountOut: 0 }
  );
  totalListWeek = [totalListWeek];
  totalListWeek = totalListWeek
    .map(({ totalCountIn, totalCountOut }) => [
      { x: "Ra", y: totalCountOut },
      { x: "Vào", y: totalCountIn },
    ])
    .flat();
    
  let pie;

  const onPointRender = (args) => {
    if (args.point.x.indexOf("Vào") > -1) {
      args.fill = "#00cc33";
    } else {
      args.fill = "#d41515";
    }
  };

  const template = chartTemplate;
  const datalabel = {
    visible: true,
    position: "Outside",
    name: "x",
    font: {
      fontWeight: "bold",
      size: "20",
    },
    template: template,
  };

  function chartTemplate(args) {
    return (
      <div id="templateWrap">
        <div style={{ color: "black" }}>{args.point.percentage}%</div>
      </div>
    );
  }
  const legendSettings = {
    visible: true,
    reverse: true,
    title: "Khách du lịch",
    titleStyle: {
      size: "16",
      fontWeight: "bold",
    },
    width: "20%",
    height: "40%",
    shapeHeight: 15,
    shapeWidth: 15,
    textStyle: { size: "medium", fontWeight: "bold" },
  };
  const title = {
    fontFamily: "Arial",
    fontWeight: "bold",
    size: "20px",
  };
  const subTitle = {
    fontFamily: "Arial",
    fontStyle: "italic",
    fontWeight: "regular",
    size: "16px",
  };
  return (
    <AccumulationChartComponent
      id="pie-chart"
      pointRender={onPointRender}
      ref={(pie) => (pie = pie)}
      legendSettings={legendSettings}
      enableSmartLabels={true}
      enableAnimation={true}
      tooltip={{ enable: true, header: "Tổng trong tuần" }}
      width="700"
      height="250"
      title={`Biểu đồ thể hiện tổng khách du lịch tham quan trong tuần ${weekCurrent}`}
      titleStyle={title}
      subTitle="Trong năm 2023 - 2024"
      subTitleStyle={subTitle}
    >
       {/* <div className="totalPie-Month">
        <p className="totalPie-Month_item green">
          Tổng vào:{" "}
          {totalListWeek.map((item) =>
            item.x === "Vào" ? item.y.toLocaleString("en-US") : null
          )}
        </p>
        <p className="totalPie-Month_item red">
          Tổng ra:{" "}
          {totalListWeek.map((item) =>
            item.x === "Ra" ? item.y.toLocaleString("en-US") : null
          )}
        </p>
      </div> */}
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={totalListWeek}
          xName="x"
          yName="y"
          innerRadius="20%"
          dataLabel={datalabel}
          radius="r"
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
}
export default PieWeek;
