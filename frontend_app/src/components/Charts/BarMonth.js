import React, {useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;

const BarMonth = ({ data, monthLabel }) => {
  const [markerValue , setMarkerValue] = useState(false);

  const handleClickChart = () => {
    const timeout = setTimeout(() => {
      setMarkerValue(!markerValue);
    }, 500); 
    
    return () => {
      clearTimeout(timeout);
    };
  }
  const legendSettings = {
    visible: true,
    title: "Khách du lịch",
    shapeHeight: 14,
    shapeWidth: 14,
    maximumLabelWidth: 50,
    enableHighlight: true,
  };

  const marker = {
    dataLabel: {
      visible: markerValue,
      font: {
        fontWeight: 'bold',
        size: 14,
      }
    },
  };

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          legendSettings={legendSettings}
          legendClick={handleClickChart}
          enableAnimation={true}
          primaryXAxis={{
            labelIntersectAction: Browser.isDevice ? "None" : "Trim",
            labelRotation: Browser.isDevice ? -45 : 0,
            labelStyle: { size: "16px" },
            valueType: "Category",
            interval: 1,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            edgeLabelPlacement: "Shift",
          }}
          primaryYAxis={{
            title: "Số lượng khách du lịch",
            titleStyle: { size: "18px", fontWeight: "bold" },
            labelStyle: { size: "14px" },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            maximum: 10000,
            interval: 1000,
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{
            enable: true,
            header: "<b>${point.tooltip}</b>",
            shared: true,
          }}
          width="500%"
          height="120%"
          title={`Biểu đồ về tổng số lượng khách du lịch tham quan trong tháng ${parseInt(monthLabel)}`}Ư
          titleStyle={{ size: "26px", fontWeight: "bold" }}
          loaded={onChartLoaded.bind(this)}
        >
          <Inject
            services={[
              ColumnSeries,
              Legend,
              Tooltip,
              Category,
              DataLabel,
              Highlight,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data}
              tooltipMappingName="dayMonth"
              xName="dayMonth"
              yName="totalCountIn"
              name="Vào"
              marker={marker}
              fill="#00cc33"
              type="Column"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data}
              tooltipMappingName="dayMonth"
              xName="dayMonth"
              yName="totalCountOut"
              name="Ra"
              marker={marker}
              fill="#f00"
              type="Column"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
  function onChartLoaded(args) {
    let chart = document.getElementById("charts");
    let legendText = chart.querySelectorAll('[id*="chart_legend_text_"]');
    let legendTitle = chart.querySelectorAll(
      '[id*="charts_chart_legend_title"]'
    );
    for (let i = 0; i < legendText.length; i++) {
      legendText[i].style.fontSize = "18px";
      legendText[i].style.fontWeight = "bold";
    }
    for (let i = 0; i < legendTitle.length; i++) {
      legendTitle[i].style.fontSize = "18px";
      legendTitle[i].style.fontWeight = "bold";
    }
  }
};
export default BarMonth;
