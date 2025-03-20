'use client';

import { Edit, Trash2 } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  manager: string;
  employeeCount: number;
}

interface DepartmentsTableProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (departmentId: number) => void;
}

export default function DepartmentsTable({ departments, onEdit, onDelete }: DepartmentsTableProps) {
  if (departments.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white">
        <p className="text-gray-500">لا يوجد قسم حاليا</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="w-full min-w-[800px] table-auto">
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">اسم القسم</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الوصف</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المدير</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">عدد الموظفين</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">إجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {departments.map((department) => (
            <tr key={department.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{department.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{department.description}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{department.manager}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{department.employeeCount}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="rounded p-1 text-blue-600 hover:bg-blue-50"
                    onClick={() => onEdit(department)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded p-1 text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(department.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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