import React from 'react';
import {
  MdBarChart,
  MdLibraryMusic,
  MdRadio,
  MdPlaylistPlay,
  MdMusicNote,
  MdPerson,
} from 'react-icons/md';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cho Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Data mẫu cho chart
const chartLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const barData = [36, 44, 36, 36, 52, 80, 52, 64, 48, 40, 36, 5];
const lineData = [30, 50, 40, 60, 70, 90, 60, 80, 55, 45, 38, 10];

const barChartData = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Nhập kho',
      data: barData,
      backgroundColor: '#000',
      borderRadius: 6,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
    },
  ],
};

const lineChartData = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Xuất kho',
      data: lineData,
      fill: false,
      borderColor: '#f87171',
      backgroundColor: '#f87171',
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#f87171',
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Sơ đồ cột: Nhập kho theo tháng',
      font: { size: 18 },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
  },
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Sơ đồ đường: Xuất kho theo tháng',
      font: { size: 18 },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { color: '#e5e7eb' } },
  },
};

// Sidebar component
const Sidebar = () => (
  <aside className="w-72 h-full bg-white border-r border-neutral-200 shadow-sm flex flex-col">
    <div className="px-6 py-4 text-xl font-bold font-['Space_Grotesk']">
      Quản lý kho hàng
    </div>
    <nav className="flex-1 px-2 space-y-2">
      <Section title="Chức năng thống kê">
        <SidebarItem
          active
          icon={<MdBarChart size={22} />}
          label="Thống kê hàng nhập"
        />
        <SidebarItem icon={<MdLibraryMusic size={22} />} label="Browse" />
        <SidebarItem icon={<MdRadio size={22} />} label="Radio" />
      </Section>
      <Section title="Library">
        <SidebarItem icon={<MdPlaylistPlay size={22} />} label="Playlists" />
        <SidebarItem icon={<MdMusicNote size={22} />} label="Songs" />
        <SidebarItem icon={<MdPerson size={22} />} label="Personalized picks" />
      </Section>
    </nav>
  </aside>
);

const Section = ({ title, children }) => (
  <div className="mb-4">
    <div className="px-4 py-2 text-base font-semibold font-['Inter']">
      {title}
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-4 px-4 h-10 rounded-lg cursor-pointer ${
      active ? 'bg-neutral-100 font-bold' : 'bg-white'
    }`}
  >
    <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    <span className="text-xl font-medium font-['Space_Grotesk']">{label}</span>
  </div>
);

// Card summary component
const SummaryCards = () => (
  <div className="flex gap-8 p-6">
    <SummaryCard
      title="Tổng tiền nhập"
      value="45,678.90"
      unit="Vnđ"
      change="+20% so với tháng trước"
    />
    <SummaryCard
      title="Tổng số lượng"
      value="2,405"
      change="+33% month over month"
    />
  </div>
);

const SummaryCard = ({ title, value, unit, change }) => (
  <div className="flex-1 p-6 bg-white rounded-lg shadow outline outline-1 outline-neutral-200 flex flex-col gap-4">
    <div className="text-xl font-bold font-['Space_Grotesk']">{title}</div>
    <div className="text-4xl font-semibold font-['Inter'] leading-10">
      {value}
      {unit && <span className="underline ml-2">{unit}</span>}
    </div>
    <div className="text-zinc-500 text-base font-medium font-['Inter']">
      {change}
    </div>
  </div>
);

export const Test = () => {
  return (
    <div className="flex w-full h-screen bg-white">
      <Sidebar />
      <main className="flex-1 bg-stone-100 overflow-auto">
        <SummaryCards />
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow outline outline-1 outline-neutral-200 p-6 flex flex-col">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          <div className="bg-white rounded-lg shadow outline outline-1 outline-neutral-200 p-6 flex flex-col">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </main>
    </div>
  );
};
