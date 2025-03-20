'use client';

import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Employee } from '@/types/employee';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: number) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              الاسم
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              البريد الإلكتروني
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              رقم الهاتف
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              القسم
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              المنصب
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              تاريخ الانضمام
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              الراتب
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              المستحقات
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              المطلوبات
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
              الحالة
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">إجراءات</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.phone}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.position}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {employee.joinDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {formatCurrency(employee.salary)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-green-600">
                {formatCurrency(employee.dues)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-red-600">
                {formatCurrency(employee.obligations)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    employee.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {employee.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </td>
              <td className="relative whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === employee.id ? null : employee.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeMenu === employee.id && (
                    <div className="absolute left-0 top-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <button
                        onClick={() => {
                          onEdit(employee);
                          setActiveMenu(null);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Pencil className="mr-3 h-4 w-4" />
                        تعديل
                      </button>
                      <button
                        onClick={() => {
                          onDelete(employee.id);
                          setActiveMenu(null);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      >
                        <Trash2 className="mr-3 h-4 w-4" />
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 