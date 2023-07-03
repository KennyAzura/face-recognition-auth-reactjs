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
import {
  getDatetime,
  getListMonth,
} from "../../features/dashboard/counterTouristSlice";

function PieMonth() {
  const listMonth = useSelector(getListMonth);
  const datetime = useSelector(getDatetime);

  const month = datetime.split("_")[1];

  let totalListMonth = listMonth.reduce(
    (total, item) => {
      total.totalCountIn += item.totalCountIn;
      total.totalCountOut += item.totalCountOut;
      return total;
    },
    { totalCountIn: 0, totalCountOut: 0 }
  );

  totalListMonth = [totalListMonth];

  totalListMonth = totalListMonth
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
    enableHighlight: true,
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
      id=""
      pointRender={onPointRender}
      ref={(pie) => (pie = pie)}
      legendSettings={legendSettings}
      enableSmartLabels={true}
      enableAnimation={true}
      tooltip={{ enable: true, header: "Tổng trong tháng" }}
      width="700"
      height="250"
      title={`Biểu đồ thể hiện tổng khách du lịch tham quan trong tháng ${parseInt(
        month
      )}`}
      titleStyle={title}
      subTitle="Trong năm 2023 - 2024"
      subTitleStyle={subTitle}
    >
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
          dataSource={totalListMonth}
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
export default PieMonth;
