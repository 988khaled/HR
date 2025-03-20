'use client';

import { useState, ChangeEvent } from 'react';
import { Download, DollarSign, Receipt, Calculator, ArrowLeftRight, FileText, FileSpreadsheet, Search } from 'lucide-react';
import * as XLSX from 'xlsx';
import StatCard from '@/components/features/Dashboard/StatCard';
import Input from '@/components/shared/Input';
import TransferModal from '@/components/features/Department/TransferModal';
import PayrollModal from '@/components/features/Payroll/PayrollModal';
import { toast } from 'sonner';

const stats = [
  {
    title: 'إجمالي الرواتب',
    value: 74500,
    icon: DollarSign,
    color: 'bg-blue-500',
  },
  {
    title: 'إجمالي البدلات',
    value: 8240,
    icon: Receipt,
    color: 'bg-green-500',
  },
  {
    title: 'إجمالي الخصومات',
    value: 4520,
    icon: Calculator,
    color: 'bg-orange-500',
  },
];

interface Employee {
  id: number;
  name: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'احمد محمد',
    department: 'تكنولوجيا المعلومات',
    basicSalary: 10000,
    allowances: 2000,
    deductions: 500,
    netSalary: 11500,
    status: 'مدفوع',
  },
  {
    id: 2,
    name: 'سارة احمد',
    department: 'الموارد البشرية',
    basicSalary: 8000,
    allowances: 1500,
    deductions: 300,
    netSalary: 9200,
    status: 'قيد المراجعة',
  },
  {
    id: 3,
    name: 'محمد علي',
    department: 'المالية',
    basicSalary: 12000,
    allowances: 3000,
    deductions: 800,
    netSalary: 14200,
    status: 'معلق',
  },
];

const departments = [
  { id: 1, name: 'تكنولوجيا المعلومات' },
  { id: 2, name: 'الموارد البشرية' },
  { id: 3, name: 'المالية' },
  { id: 4, name: 'المبيعات' },
];

export default function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const formatter = new Intl.NumberFormat('ar-SA');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTransfer = (data: {
    employeeId: number;
    departmentId: number;
    transferDate: string;
    notes: string;
  }) => {
    // Update employee department
    const newDepartment = departments.find((dept) => dept.id === data.departmentId)?.name;
    if (!newDepartment) return;

    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === data.employeeId
          ? {
              ...employee,
              department: newDepartment,
            }
          : employee
      )
    );

    // Show success message
    toast.success(`تم نقل الموظف إلى ${newDepartment} بنجاح`);
    setIsTransferModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleCreatePayroll = (data: { month: string; year: string; notes: string }) => {
    // Here you would typically make an API call to create the payroll
    const payrollData = {
      ...data,
      employees: employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        basicSalary: emp.basicSalary,
        allowances: emp.allowances,
        deductions: emp.deductions,
        netSalary: emp.netSalary
      }))
    };
    
    // Simulate API call
    console.log('Creating payroll:', payrollData);
    toast.success('تم إنشاء مسير الرواتب بنجاح');
    setIsPayrollModalOpen(false);
  };

  const handleExport = () => {
    // Prepare data for export
    const exportData = employees.map(emp => ({
      'الموظف': emp.name,
      'القسم': emp.department,
      'الراتب الأساسي': emp.basicSalary,
      'البدلات': emp.allowances,
      'الخصومات': emp.deductions,
      'صافي الراتب': emp.netSalary,
      'الحالة': emp.status
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData, {
      header: [
        'الموظف',
        'القسم',
        'الراتب الأساسي',
        'البدلات',
        'الخصومات',
        'صافي الراتب',
        'الحالة'
      ]
    });

    // Set RTL
    ws['!cols'] = [
      { wch: 20 }, // الموظف
      { wch: 15 }, // القسم
      { wch: 15 }, // الراتب الأساسي
      { wch: 12 }, // البدلات
      { wch: 12 }, // الخصومات
      { wch: 15 }, // صافي الراتب
      { wch: 12 }, // الحالة
    ];

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'مسير الرواتب');

    // Save the file
    XLSX.writeFile(wb, `payroll-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast.success('تم تصدير البيانات بنجاح');
  };

  const openTransferModal = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setIsTransferModalOpen(true);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.includes(searchTerm) || employee.department.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مدفوع':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'قيد المراجعة':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'معلق':
        return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">الرواتب</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPayrollModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900"
          >
            <FileText className="h-4 w-4" />
            إنشاء مسير رواتب
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <FileSpreadsheet className="h-4 w-4" />
            تصدير إلى Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Input
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="بحث عن موظف..."
            className="max-w-xs"
            icon={Search}
          />
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            إجمالي النتائج: {filteredEmployees.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-right dark:border-gray-700">
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الموظف
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  القسم
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الراتب الأساسي
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  البدلات
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الخصومات
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  صافي الراتب
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الحالة
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="group hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{employee.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {employee.department}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4" dir="ltr">
                    <div className="text-right text-base font-bold text-gray-900 dark:text-white">
                      {formatter.format(employee.basicSalary)}
                      <span className="mr-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        ر.س
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4" dir="ltr">
                    <div className="text-right text-base font-bold text-green-600 dark:text-green-400">
                      {formatter.format(employee.allowances)}
                      <span className="mr-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        ر.س
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4" dir="ltr">
                    <div className="text-right text-base font-bold text-red-600 dark:text-red-400">
                      {formatter.format(employee.deductions)}
                      <span className="mr-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        ر.س
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4" dir="ltr">
                    <div className="text-right text-base font-bold text-gray-900 dark:text-white">
                      {formatter.format(employee.netSalary)}
                      <span className="mr-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        ر.س
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openTransferModal(employee.id)}
                      className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      <ArrowLeftRight className="h-3 w-3" />
                      نقل
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        onSubmit={handleTransfer}
        selectedEmployeeId={selectedEmployeeId}
      />

      <PayrollModal
        isOpen={isPayrollModalOpen}
        onClose={() => setIsPayrollModalOpen(false)}
        onSubmit={handleCreatePayroll}
      />
    </div>
  );
} 