
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const emiCollectionData = [
  { time: '9 AM', collected: 15000, pending: 8000 },
  { time: '11 AM', collected: 28000, pending: 12000 },
  { time: '1 PM', collected: 45000, pending: 18000 },
  { time: '3 PM', collected: 62000, pending: 15000 },
  { time: '5 PM', collected: 78000, pending: 10000 },
];

const dpd0to30Data = [
  { range: '0-7 days', count: 45, amount: 125000 },
  { range: '8-15 days', count: 23, amount: 78000 },
  { range: '16-23 days', count: 12, amount: 45000 },
  { range: '24-30 days', count: 8, amount: 32000 },
];

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* EMI Collection Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Today's Collection Trend
          </CardTitle>
          <CardDescription>
            Real-time EMI collection vs pending amounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={emiCollectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="collected" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.6}
                name="Collected (₹)"
              />
              <Area 
                type="monotone" 
                dataKey="pending" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b"
                fillOpacity={0.6}
                name="Pending (₹)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* DPD Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            DPD 0-30 Analysis
          </CardTitle>
          <CardDescription>
            Days Past Due breakdown for early intervention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dpd0to30Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} name="Account Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
