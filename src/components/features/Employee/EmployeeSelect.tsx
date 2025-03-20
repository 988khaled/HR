'use client';

import { User } from 'lucide-react';
import { BaseEmployee } from '@/types/employee';

interface EmployeeSelectProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

// Mock data for demonstration
const mockEmployees: BaseEmployee[] = [
  { id: 1, name: 'أحمد محمد', department: 'تقنية المعلومات' },
  { id: 2, name: 'سارة عبدالله', department: 'الموارد البشرية' },
  { id: 3, name: 'محمد علي', department: 'المالية' },
];

export default function EmployeeSelect({ value, onChange, error }: EmployeeSelectProps) {
  return (
    <div>
      <div className="relative">
        <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full appearance-none rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        >
          <option value={0}>اختر موظف...</option>
          {mockEmployees.map((employee) => (
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