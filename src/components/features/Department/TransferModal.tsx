'use client';

import { useState, useEffect } from 'react';
import { ArrowLeftRight, Building2, Calendar } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import { BaseEmployee } from '@/types/employee';

interface Department {
  id: number;
  name: string;
}

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { employeeId: number; departmentId: number; transferDate: string; notes: string }) => void;
  selectedEmployeeId: number | null;
}

const departments: Department[] = [
  { id: 1, name: 'تكنولوجيا المعلومات' },
  { id: 2, name: 'الموارد البشرية' },
  { id: 3, name: 'المالية' },
  { id: 4, name: 'المبيعات' },
];

// Mock data - replace with API call
const employees: BaseEmployee[] = [
  { id: 1, name: 'أحمد محمد', department: 'تكنولوجيا المعلومات' },
  { id: 2, name: 'سارة أحمد', department: 'الموارد البشرية' },
  { id: 3, name: 'محمد علي', department: 'المالية' },
];

export default function TransferModal({ isOpen, onClose, onSubmit, selectedEmployeeId }: TransferModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({
    employee: '',
    department: '',
    date: '',
  });

  useEffect(() => {
    if (selectedEmployeeId) {
      setSelectedEmployee(String(selectedEmployeeId));
    }
  }, [selectedEmployeeId]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDepartment('');
      setTransferDate('');
      setNotes('');
      setErrors({
        employee: '',
        department: '',
        date: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      employee: '',
      department: '',
      date: '',
    });

    // Validate form
    let hasError = false;
    const newErrors = {
      employee: '',
      department: '',
      date: '',
    };

    if (!selectedEmployee) {
      newErrors.employee = 'يرجى اختيار الموظف';
      hasError = true;
    }

    if (!selectedDepartment) {
      newErrors.department = 'يرجى اختيار القسم';
      hasError = true;
    }

    if (!transferDate) {
      newErrors.date = 'يرجى تحديد تاريخ النقل';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onSubmit({
      employeeId: Number(selectedEmployee),
      departmentId: Number(selectedDepartment),
      transferDate,
      notes,
    });

    // Reset form
    setSelectedDepartment('');
    setTransferDate('');
    setNotes('');
    onClose();
  };

  const selectedEmployeeData = employees.find((emp) => emp.id === Number(selectedEmployee));

  return (
    <Modal title="نقل موظف" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="employee"
              className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white"
            >
              الموظف
            </label>
            <select
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              disabled={!!selectedEmployeeId}
            >
              <option value="">اختر الموظف</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.department}
                </option>
              ))}
            </select>
            {errors.employee && (
              <p className="mt-1.5 text-sm font-medium text-red-500">{errors.employee}</p>
            )}
          </div>

          {selectedEmployeeData && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    القسم الحالي: {selectedEmployeeData.department}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="department"
              className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white"
            >
              القسم الجديد
            </label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">اختر القسم</option>
              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                  disabled={department.name === selectedEmployeeData?.department}
                >
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1.5 text-sm font-medium text-red-500">{errors.department}</p>
            )}
          </div>

          <Input
            id="transferDate"
            type="date"
            label="تاريخ النقل"
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
            error={errors.date}
          />

          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white"
            >
              ملاحظات
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="أضف ملاحظات حول سبب النقل..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <ArrowLeftRight className="h-4 w-4" />
            تأكيد النقل
          </button>
        </div>
      </form>
    </Modal>
  );
} 