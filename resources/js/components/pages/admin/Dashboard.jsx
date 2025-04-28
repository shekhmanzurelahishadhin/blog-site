import React from 'react'
import Preloader from '../../ui/Preloader'
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, 
  AreaChart, Area, 
  ResponsiveContainer 
} from 'recharts';

// Sample data for the charts
const data = [
  { name: 'Jan', revenue: 4000, users: 2400, expenses: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398, expenses: 2210 },
  { name: 'Mar', revenue: 2000, users: 9800, expenses: 2290 },
  { name: 'Apr', revenue: 2780, users: 3908, expenses: 2000 },
  { name: 'May', revenue: 1890, users: 4800, expenses: 2181 },
  { name: 'Jun', revenue: 2390, users: 3800, expenses: 2500 },
  { name: 'Jul', revenue: 3490, users: 4300, expenses: 2100 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const metrics = [
  { title: 'Total Users', value: '12,345', change: '+12%', trend: 'up' },
  { title: 'Revenue', value: '$34,546', change: '+8%', trend: 'up' },
  { title: 'Conversion', value: '3.2%', change: '-0.5%', trend: 'down' },
  { title: 'Avg. Session', value: '2m 45s', change: '+15%', trend: 'up' },
];

export default function Dashboard() {
  return (
     <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold mt-1">{metric.value}</p>
            <div className={`flex items-center mt-2 ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {metric.trend === 'up' ? (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span className="text-sm">{metric.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Revenue" />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
