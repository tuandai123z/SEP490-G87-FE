import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MyChart = ({ data, title, type }) => {
    const months = data && data?.map(item => {
        return `Tháng ${item?.month}`
    });
    const totalAmounts = data.map(item => item.totalAmount);
    const totalForms = data.map(item => item.totalFormInMonth);

    const options = {
        chart: {
            type: type
        },
        title: {
            text: title
        },
        xAxis: {
            categories: months,
            title: {
                text: "Tháng"
            }
        },
        yAxis: [
            {
                title: {
                    text: "Tổng tiền"
                },
                labels: {
                    format: "{value}đ"
                }
            },
            {
                title: {
                    text: "Tổng số đơn"
                },
                opposite: true, // hiện ở bên phải
                labels: {
                    format: "{value} đơn"
                }
            }
        ],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: true,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [
            {
                name: "Tổng tiền",
                data: totalAmounts,
                color: "#434348"
            },
            {
                name: "Tổng số đơn",
                data: totalForms,
                yAxis: 1,
                color: "#7cb5ec"
            }
        ]
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    )
};

export default MyChart;