'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import AttendanceTable from '@/components/features/Attendance/AttendanceTable';
import FilterTabs from '@/components/features/Attendance/FilterTabs';
import SearchBar from '@/components/features/Departments/SearchBar';

// Mock data - replace with actual API call
const mockAttendanceRecords = [
  {
    id: 1,
    date: '2024-03-19',
    employee: 'أحمد محمد',
    department: 'تكنولوجيا المعلومات',
    status: 'present',
    checkIn: '08:30 ص',
    checkOut: '04:30 م',
  },
  {
    id: 2,
    date: '2024-03-19',
    employee: 'سارة أحمد',
    department: 'الموارد البشرية',
    status: 'late',
    checkIn: '09:15 ص',
    checkOut: '05:00 م',
  },
  {
    id: 3,
    date: '2024-03-19',
    employee: 'محمد علي',
    department: 'المالية',
    status: 'absent',
    checkIn: '-',
    checkOut: '-',
  },
  {
    id: 4,
    date: '2024-03-19',
    employee: 'فاطمة حسن',
    department: 'التسويق',
    status: 'leave',
    checkIn: '-',
    checkOut: '-',
  },
] as const;

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [records] = useState(mockAttendanceRecords);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.employee.includes(searchQuery) ||
      record.department.includes(searchQuery);

    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && record.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/record-attendance"
          className="flex items-center gap-2 rounded-lg bg-[#9747FF] px-4 py-2 text-sm font-medium text-white hover:bg-purple-600"
        >
          <Clock className="h-5 w-5" />
          تسجيل الحضور
        </Link>
        <h1 className="text-2xl font-bold">الحضور والانصراف</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full max-w-md">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <AttendanceTable records={filteredRecords} />
      </div>
    </div>
  );
} 