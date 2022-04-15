import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 350px;
`;

export default function Donut({ data }) {
  const series = data;
  const options = {
    chart: {},
    dataLabels: { enabled: false },
    labels: ["남성", "여성"],
    colors: ["#52a8f3", "#ff6d6e"],
    legend: {
      fontSize: "18px",
      fontFamily: "Noto Serif KR",
      fontWeight: 400,
      position: "right",
      offsetY: 30,
    },
    tooltip: {
      style: {
        fontSize: "18px",
        fontFamily: "Noto Serif KR",
      },
      y: {
        formatter: (v) => v + "%",
      },
    },
  };

  return (
    <Wrapper>
      <ApexChart type="donut" series={series} options={options} />
    </Wrapper>
  );
}
