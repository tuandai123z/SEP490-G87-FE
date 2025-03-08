import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const options = {
    title: {
        text: "Biểu đồ thống kê",
    },
    series: [
        {
            name: "Dữ liệu",
            data: [1, 3, 2, 4],
        },
    ],
};

const MyChart = () => <HighchartsReact highcharts={Highcharts} options={options} />;

export default MyChart;