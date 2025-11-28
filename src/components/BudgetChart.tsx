import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const budgetData = [
  { name: "Roads & Infrastructure", value: 35, color: "hsl(var(--chart-roads))" },
  { name: "Waste Management", value: 18, color: "hsl(var(--chart-waste))" },
  { name: "Water & Sanitation", value: 22, color: "hsl(var(--chart-water))" },
  { name: "Education", value: 15, color: "hsl(var(--chart-education))" },
  { name: "Sanitation", value: 10, color: "hsl(var(--chart-sanitation))" },
];

const BudgetChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={budgetData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value) => <span className="text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
