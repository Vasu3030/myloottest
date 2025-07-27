import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRef, useEffect } from "react";

interface Props {
  title: string;
  monthInfo: string;
  yearInfo: number;
  data: {
    day: number;
    coins: number;
  }[];
  offset: number;
  setOffset: (offset: number) => void;
}

const TimelineChart = ({ title, monthInfo, yearInfo, data, offset, setOffset }: Props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [offset]);

  return (
    <div 
    ref={chartRef}
    style={{ width: '100%', height: 300 }} 
    className="flex flex-col gap-1 items-center justify-center pr-10 py-10">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          className="bg-amber-300 text-gray-900 px-2 py-1 rounded font-bold hover:bg-amber-400"
          onClick={() => setOffset(offset - 1)}
        >
          ◀
        </button>
        <h3 className="text-amber-300">{title} — {monthInfo} {yearInfo}</h3>
        <button
          type="button"
          className="bg-amber-300 text-gray-900 px-2 py-1 rounded font-bold hover:bg-amber-400 disabled:opacity-50"
          onClick={() => setOffset(offset + 1)}
          disabled={offset === 0}
        >
          ▶
        </button>
      </div>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tickFormatter={d => d.toString()} label={{ value: "Day", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Coins", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="coins" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;