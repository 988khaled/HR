'use client';

import { User } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  department: string;
}

interface EmployeeSelectProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

// Mock data - replace with API call
const employees: Employee[] = [
  { id: 1, name: 'أحمد محمد', department: 'تكنولوجيا المعلومات' },
  { id: 2, name: 'سارة أحمد', department: 'الموارد البشرية' },
  { id: 3, name: 'محمد علي', department: 'المالية' },
];

export default function EmployeeSelect({ value, onChange, error }: EmployeeSelectProps) {
  return (
    <div>
      <label htmlFor="employee" className="mb-1 block text-sm font-medium text-gray-700">
        الموظف
      </label>
      <div className="relative">
        <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <select
          id="employee"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full appearance-none rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">اختر موظف</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name} - {employee.department}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
} 