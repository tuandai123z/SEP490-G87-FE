import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const options = {
    chart: {
        type: 'column'
    },
    title: {
        text: "Biểu đồ thống kê",
    },
    series: [
        {
            name: "Dữ liệu",
            data: [1, 3, 2, 4, 3, 1, 2, 5, 3, 1, 2, 5],
        },
    ],
};

const MyChart = () => <HighchartsReact highcharts={Highcharts} options={options} />;

export default MyChart;