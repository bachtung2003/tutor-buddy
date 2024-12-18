"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type User = {
  user_id: number;
  role: "teacher" | "student";
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  teacher: {
    label: "Teacher",
    color: "hsl(var(--chart-1))",
  },
  student: {
    label: "Student",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const colors = ["var(--color-teacher)", "var(--color-student)"];

type UserChartProps = {
  data: User[];
};
type RoleCounts = {
  role: "teacher" | "student";
  quantity: number;
  fill: string;
};

const UserChart: React.FC<{ data: { role: "teacher" | "student" }[] }> = ({
  data,
}) => {
  const roleCounts: RoleCounts[] = data.reduce<RoleCounts[]>((counts, user) => {
    const existingRole = counts.find((count) => count.role === user.role);
    if (!existingRole) {
      const remainingColors = colors.filter(
        (color) => !counts.some((count) => count.fill === color)
      );
      const randomColor =
        remainingColors[Math.floor(Math.random() * remainingColors.length)];
      counts.push({ role: user.role, quantity: 1, fill: randomColor });
    } else {
      existingRole.quantity += 1;
    }
    return counts;
  }, []);
  console.log(roleCounts);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Users Registered</CardTitle>
        <CardDescription>Divided by Role</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            height={60}
            accessibilityLayer
            data={roleCounts}
            layout="vertical"
            margin={{
              left: 2,
            }}
          >
            <YAxis
              height={60}
              dataKey="role"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis height={60} dataKey="quantity" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" layout="vertical" radius={5} height={30} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserChart;
