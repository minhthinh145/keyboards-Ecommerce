import React, { useState, useRef, useEffect } from 'react';
import {
  MdEdit,
  MdDelete,
  MdPeople,
  MdSchedule,
  MdSwapHoriz,
  MdAttachMoney,
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdToday,
  MdCalendarToday,
  MdDateRange,
  MdViewWeek,
} from 'react-icons/md';

// Header cho bảng
const days = [
  'Ca làm',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ nhật',
];

// 3 ca làm
const shifts = [
  { id: 1, name: 'Ca 1' },
  { id: 2, name: 'Ca 2' },
  { id: 3, name: 'Ca 3' },
];

// Fake data dài cho EmployeeCard
const employees = [
  {
    id: '12345678',
    name: 'Phan Huỳnh Minh Thịnh',
    info: 'Một người bth , hehehe',
  },
  {
    id: '87654321',
    name: 'Nguyễn Văn A',
    info: 'Nhân viên part-time, chuyên môn: UI/UX, ',
  },
  {
    id: '11223344',
    name: 'Trần Thị B',
    info: ', từng làm việc ở nhiều công ty lớn, thích nấu ăn, thích xem phim Hàn Quốc, thích đi shopping.',
  },
];

// Sửa hàm randomShiftTable để lấy đủ info
function randomShiftTable() {
  // 3 ca x 7 ngày, mỗi cell là 1 mảng nhân viên
  const table = Array.from({ length: 3 }, () =>
    Array.from({ length: 7 }, () => [])
  );
  // Random gán 1-2 nhân viên cho mỗi cell (demo)
  for (let ca = 0; ca < 3; ca++) {
    for (let day = 0; day < 7; day++) {
      const n = Math.random() > 0.7 ? 2 : Math.random() > 0.5 ? 1 : 0;
      for (let i = 0; i < n; i++) {
        const emp = employees[Math.floor(Math.random() * employees.length)];
        // Tránh trùng nhân viên trong cùng 1 cell
        if (!table[ca][day].some((e) => e.id === emp.id)) {
          table[ca][day].push(emp);
        }
      }
    }
  }
  return table;
}

// Sửa EmployeeCard để hiện info dài
const EmployeeCard = ({ name, id, info, onEdit, onDelete }) => (
  <div className="bg-blue-100 rounded-xl border border-blue-400 shadow p-3 flex flex-col items-center max-w-xs">
    <div className="text-center text-red-500 text-base font-semibold">
      {name}
    </div>
    <div className="text-center text-black text-base font-medium mb-1">
      Mã nhân viên: {id}
    </div>
    <div className="text-center text-zinc-700 text-sm mb-2 break-words">
      {info}
    </div>
    <div className="flex justify-center gap-2 mt-2">
      <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
        <MdEdit size={18} />
      </button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        <MdDelete size={18} />
      </button>
    </div>
  </div>
);

// Nút thêm
const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-full h-full text-blue-500 hover:text-blue-700"
    style={{ minHeight: 80 }}
  >
    <MdAdd size={28} />
    <span className="text-base font-medium">Thêm</span>
  </button>
);

// Sidebar Dashboard
const Sidebar = () => (
  <aside className="w-72 min-h-screen bg-white border-r-2 border-black/70 shadow flex flex-col py-6 px-2">
    <div className="mb-6 px-2">
      <div className="flex items-center gap-2 text-xl font-bold font-['Space_Grotesk']">
        <MdPeople size={28} className="text-black" />
        Quản lý nhân sự
      </div>
    </div>
    <div className="border-b border-neutral-300 mb-4"></div>
    <nav className="flex flex-col gap-2">
      <SidebarSection title="Quản lý ca làm">
        <SidebarItem
          icon={<MdSchedule size={22} />}
          label="Sắp xếp lịch làm"
          active
        />
        <SidebarItem icon={<MdViewWeek size={22} />} label="Lịch tổng quan" />
      </SidebarSection>
      <SidebarSection title="Khác">
        <SidebarItem
          icon={<MdSwapHoriz size={22} />}
          label="Duyệt yêu cầu đổi ca"
        />
        <SidebarItem
          icon={<MdAttachMoney size={22} />}
          label="Quản lý tiền lương"
        />
      </SidebarSection>
    </nav>
  </aside>
);

const SidebarSection = ({ title, children }) => (
  <div className="mb-2">
    <div className="px-4 py-1 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
      {title}
    </div>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
      active
        ? 'bg-neutral-100 font-bold border-l-4 border-blue-500 text-black'
        : 'hover:bg-neutral-100 text-zinc-700'
    }`}
  >
    <span>{icon}</span>
    <span className="text-base font-['Space_Grotesk']">{label}</span>
  </div>
);

// Thanh chọn tháng, tuần, hiện tại, điều hướng
const CalendarHeader = () => (
  <div className="w-full bg-white px-8 py-4 flex flex-wrap items-center gap-6 border-b border-neutral-200">
    <div className="flex gap-4 items-center">
      <button className="px-4 py-1.5 rounded-2xl outline outline-1 outline-black/20 flex items-center gap-2 hover:bg-neutral-100">
        <MdCalendarToday size={22} className="text-black" />
        <span className="text-black text-xl font-bold font-['Manrope']">
          7/2025
        </span>
      </button>
      <button className="px-4 py-1.5 rounded-2xl outline outline-1 outline-black/20 flex items-center gap-2 hover:bg-neutral-100">
        <MdDateRange size={22} className="text-black" />
        <span className="text-black text-xl font-bold font-['Manrope']">
          01/7 - 07/07
        </span>
      </button>
      <button className="h-10 px-4 bg-black rounded-2xl outline outline-1 outline-black/20 flex items-center justify-center hover:bg-neutral-900">
        <MdChevronLeft size={24} className="text-white" />
      </button>
      <button className="px-4 py-1.5 bg-black rounded-2xl outline outline-1 outline-black/20 flex items-center gap-2 hover:bg-neutral-900">
        <MdToday size={22} className="text-white" />
        <span className="text-white text-xl font-bold font-['Space_Grotesk']">
          Hiện tại
        </span>
      </button>
      <button className="h-10 px-4 bg-black rounded-2xl outline outline-1 outline-black/20 flex items-center justify-center hover:bg-neutral-900">
        <MdChevronRight size={24} className="text-white" />
      </button>
    </div>
  </div>
);

// Table ca làm tự co giãn dọc ngang
const ShiftTable = () => {
  const [table, setTable] = useState(randomShiftTable());

  // Xử lý thêm, sửa, xóa (demo alert)
  const handleAdd = (caIdx, dayIdx) => {
    alert(`Thêm nhân viên vào Ca ${caIdx + 1}, ${days[dayIdx + 1]}`);
  };
  const handleEdit = (caIdx, dayIdx, emp) => {
    alert(
      `Sửa nhân viên ${emp.name} (${emp.id}) ở Ca ${caIdx + 1}, ${days[dayIdx + 1]}`
    );
  };
  const handleDelete = (caIdx, dayIdx, emp) => {
    alert(
      `Xóa nhân viên ${emp.name} (${emp.id}) ở Ca ${caIdx + 1}, ${days[dayIdx + 1]}`
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-4 overflow-auto max-w-full w-full mt-0">
        <div className="overflow-auto px-8">
          {' '}
          {/* px-8 để table thẳng với CalendarHeader */}
          <table className="min-w-[900px] bg-white border-4 border-black rounded-lg table-fixed mx-auto my-0 w-full">
            <colgroup>
              {Array.from({ length: 8 }).map((_, idx) => (
                <col key={idx} className="w-1/8" />
              ))}
            </colgroup>
            <thead>
              <tr>
                {days.map((d, idx) => (
                  <th
                    key={d}
                    className="py-3 border-4 border-black bg-neutral-100 text-black text-base font-bold font-['Inter'] text-center align-middle"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift, caIdx) => (
                <tr key={shift.id} className="align-middle">
                  <td className="border-4 border-black bg-neutral-50 font-bold text-black text-base text-center align-middle px-2 py-3">
                    {shift.name}
                  </td>
                  {Array.from({ length: 7 }).map((_, dayIdx) => (
                    <td
                      key={dayIdx}
                      className="border-4 border-black text-center align-middle p-2"
                    >
                      <div className="flex flex-col items-center gap-2 w-full">
                        {table[caIdx][dayIdx].map((emp, idx) => (
                          <EmployeeCard
                            key={emp.id + idx}
                            name={emp.name}
                            id={emp.id}
                            info={emp.info}
                            onEdit={() => handleEdit(caIdx, dayIdx, emp)}
                            onDelete={() => handleDelete(caIdx, dayIdx, emp)}
                          />
                        ))}
                        <AddButton onClick={() => handleAdd(caIdx, dayIdx)} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
  );
};

export const TestQLNhanSu = () => {
  return (
    <div className="flex bg-stone-100 min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Calendar header sát trên, sát trái, sát sidebar */}
        <div
          className="bg-white border-b border-neutral-200 w-full"
          style={{ marginLeft: 0 }}
        >
          <CalendarHeader />
        </div>
        {/* Table sát 2 bên, tự co giãn */}
        <div className="flex-1 flex flex-col justify-start items-stretch w-full px-0 pt-4">
          <ShiftTable />
        </div>
      </div>
    </div>
  );
};

/*
Giải thích:
- Bỏ hết logic height/width cứng, chỉ dùng min-width cho table để scroll ngang nếu thiếu chỗ.
- Table nằm trong khung bo góc, shadow, padding, xuất phát cùng line với CalendarHeader.
- Các cell, header, cột đầu tiên đều dùng align-middle + text-center để căn giữa dọc và ngang.
- Các dòng sẽ tự co dọc theo nội dung lớn nhất của dòng đó.
- Các thẻ EmployeeCard có padding, bo góc, luôn căn giữa trong cell.
*/
