import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = ({ data, title }) => {

    const options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b> ({point.y} đơn)'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [
            {
                name: "Tổng số đơn",
                colorByPoint: true,
                data: data
            }
        ]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
};

export default PieChart;