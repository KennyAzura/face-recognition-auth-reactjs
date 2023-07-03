import React, { useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  Highlight,
  LineSeries,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const LineChart = ({ area1, area2, area3 }) => {
  console.log(area3);
  const legendSettings = {
    visible: true,
    title: "Khu du lịch",
    shapeHeight: 14,
    shapeWidth: 14,
    maximumLabelWidth: 50,
    enableHighlight: true,
  };

  const marker = {
    dataLabel: {
      font: {
        fontWeight: "bold",
        size: 14,
      },
    },
  };

  return (
    <div className="control-pane" style={{ marginTop: "30px" }}>
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          legendSettings={legendSettings}
          enableAnimation={true}
          primaryXAxis={{
            labelIntersectAction: Browser.isDevice ? "None" : "Trim",
            labelRotation: Browser.isDevice ? -45 : 0,
            labelStyle: { size: "16px" },
            valueType: "Category",
            interval: Math.ceil(area3.length / 10),
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
            maximum: 10500,
            interval: 1000,
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{
            enable: true,
            header: "<b>${point.tooltip}</b>",
            shared: true,
          }}
          width="100%"
          height="120%"
          title="Biểu đồ tổng số lượng khách du lịch tham quan các khu du lịch trong năm"
          titleStyle={{ size: "26px", fontWeight: "bold" }}
          loaded={onChartLoaded.bind(this)}
        >
          <Inject
            services={[
              LineSeries,
              Legend,
              Tooltip,
              Category,
              DataLabel,
              Highlight,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={area1}
              tooltipMappingName="datetime"
              xName="datetime"
              yName="totalCountIn"
              name="1"
              marker={marker}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={area2}
              tooltipMappingName="datetime"
              xName="datetime"
              yName="totalCountIn"
              name="2"
              marker={marker}
              type="Line"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={area3}
              tooltipMappingName="datetime"
              xName="datetime"
              yName="totalCountIn"
              name="3"
              marker={marker}
              type="Line"
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
export default LineChart;
