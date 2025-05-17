import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#715660",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#846470",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#566071",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#727f96",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#c39f72",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#d5bf95",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#667762",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#879e82",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#562c29",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#ab5852",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#cb9979",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#eadaa0",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#d69e49",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#838469",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#657268",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#476066",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) => (obj.duration === field ? { ...obj, value: obj.value + 1 } : obj));
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay Duration Summary</Heading>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={80}
            outerRadius={120}
            // innerRadius={85} outerRadius={110}
            cx="40%"
            cy="40%"
            paddingAngle={3}
            // fill="#8884d8"
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="middle" align="right" width="30%" layout="vertical" iconSize={15} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
