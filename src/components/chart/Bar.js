import ApexChart from "react-apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 400px;
`;

export default function Bar({ data }) {
  const series = [{ name: "", data }];
  const options = {
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["10대", "20대", "30대", "40대", "50대", "60대~"],
      position: "bottom",
    },
    tooltip: {
      marker: false,
      style: {
        fontSize: "18px",
        fontFamily: "Noto Serif KR",
      },
      y: {
        formatter: (v) => v + "%",
      },
    },
    colors: ["#ffaa00"],
    chart: {
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <Wrapper>
      <ApexChart type="bar" series={series} options={options} />
    </Wrapper>
  );
}
