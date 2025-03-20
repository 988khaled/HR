'use client';

import { useState } from 'react';
import { DollarSign, FileSpreadsheet, Plus, Wallet, Download } from 'lucide-react';
import MetricCard from '@/components/features/Payroll/MetricCard';
import PayrollTable from '@/components/features/Payroll/PayrollTable';
import PeriodSelector from '@/components/features/Payroll/PeriodSelector';
import SearchBar from '@/components/features/Departments/SearchBar';

// Mock data - replace with actual API call
const mockPayrollRecords = [
  {
    id: 1,
    employee: 'أحمد محمد',
    department: 'تكنولوجيا المعلومات',
    basicSalary: 10000,
    allowances: 2000,
    deductions: 500,
    netSalary: 11500,
    status: 'paid',
  },
  {
    id: 2,
    employee: 'سارة أحمد',
    department: 'الموارد البشرية',
    basicSalary: 8000,
    allowances: 1500,
    deductions: 300,
    netSalary: 9200,
    status: 'processing',
  },
  {
    id: 3,
    employee: 'محمد علي',
    department: 'المالية',
    basicSalary: 12000,
    allowances: 3000,
    deductions: 800,
    netSalary: 14200,
    status: 'pending',
  },
] as const;

export default function PayrollPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024-03');
  const [records] = useState(mockPayrollRecords);

  const filteredRecords = records.filter(
    (record) =>
      record.employee.includes(searchQuery) ||
      record.department.includes(searchQuery)
  );

  const totalSalaries = records.reduce((sum, record) => sum + record.netSalary, 0);
  const totalAllowances = records.reduce((sum, record) => sum + record.allowances, 0);
  const totalDeductions = records.reduce((sum, record) => sum + record.deductions, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600">
            <Plus className="h-5 w-5" />
            إنشاء راتب
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            تصدير
          </button>
        </div>
        <h1 className="text-2xl font-bold">الرواتب</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <MetricCard
          title="إجمالي الرواتب"
          value={totalSalaries}
          icon={DollarSign}
          color="bg-[#1677FF]"
        />
        <MetricCard
          title="إجمالي البدلات"
          value={totalAllowances}
          icon={Wallet}
          color="bg-[#28A745]"
        />
        <MetricCard
          title="إجمالي الخصومات"
          value={totalDeductions}
          icon={FileSpreadsheet}
          color="bg-[#FF7F50]"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full max-w-xs">
            <PeriodSelector value={selectedPeriod} onChange={setSelectedPeriod} />
          </div>
          <div className="w-full max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        <PayrollTable records={filteredRecords} />
      </div>
    </div>
  );
} 