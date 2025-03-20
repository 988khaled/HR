'use client';

import { Edit, MoreVertical } from 'lucide-react';

interface PayrollRecord {
  id: number;
  employee: string;
  department: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
}

interface PayrollTableProps {
  records: PayrollRecord[];
}

const statusClasses = {
  paid: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
};

const statusLabels = {
  paid: 'مدفوع',
  pending: 'معلق',
  processing: 'قيد المعالجة',
};

export default function PayrollTable({ records }: PayrollTableProps) {
  if (records.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white">
        <p className="text-gray-500">لا توجد سجلات رواتب حالياً</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="w-full min-w-[1000px] table-auto">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الموظف</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">القسم</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الراتب الأساسي</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">البدلات</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الخصومات</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">صافي الراتب</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">إجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{record.employee}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{record.department}</td>
              <td className="px-6 py-4 text-sm text-gray-900" dir="ltr">
                {formatCurrency(record.basicSalary)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900" dir="ltr">
                {formatCurrency(record.allowances)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900" dir="ltr">
                {formatCurrency(record.deductions)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900" dir="ltr">
                {formatCurrency(record.netSalary)}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    statusClasses[record.status]
                  }`}
                >
                  {statusLabels[record.status]}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="rounded p-1 text-blue-600 hover:bg-blue-50"
                    onClick={() => {}}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded p-1 text-gray-400 hover:bg-gray-100"
                    onClick={() => {}}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 