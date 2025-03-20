'use client';

import { useState } from 'react';
import { Calendar, Clock, Activity } from 'lucide-react';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';

interface AttendanceFormProps {
  onSubmit: (data: {
    employeeId: number;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    notes: string;
  }) => void;
  onClose: () => void;
}

const statuses = [
  { value: 'present', label: 'حاضر' },
  { value: 'late', label: 'متأخر' },
  { value: 'absent', label: 'غائب' },
  { value: 'leave', label: 'إجازة' },
];

export default function AttendanceForm({ onSubmit, onClose }: AttendanceFormProps) {
  const [formData, setFormData] = useState({
    employeeId: 0,
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    employeeId: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: '',
  });

  const validateForm = () => {
    const newErrors = {
      employeeId: '',
      date: '',
      checkIn: '',
      checkOut: '',
      status: '',
    };

    if (!formData.employeeId) {
      newErrors.employeeId = 'يرجى اختيار موظف';
    }

    if (!formData.date) {
      newErrors.date = 'يرجى اختيار التاريخ';
    }

    if (!formData.status) {
      newErrors.status = 'يرجى اختيار الحالة';
    }

    if (formData.status === 'present' || formData.status === 'late') {
      if (!formData.checkIn) {
        newErrors.checkIn = 'يرجى إدخال وقت الحضور';
      }
      if (!formData.checkOut) {
        newErrors.checkOut = 'يرجى إدخال وقت الانصراف';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select
        id="employeeId"
        label="الموظف"
        value={formData.employeeId || ''}
        onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: Number(e.target.value) }))}
        error={errors.employeeId}
      >
        <option value="">اختر موظف</option>
        <option value="1">أحمد محمد</option>
        <option value="2">محمد علي</option>
        <option value="3">فاطمة أحمد</option>
      </Select>

      <Input
        id="date"
        label="التاريخ"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
        error={errors.date}
        icon={Calendar}
      />

      <Select
        id="status"
        label="الحالة"
        value={formData.status}
        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
        error={errors.status}
        icon={Activity}
      >
        <option value="">اختر الحالة</option>
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </Select>

      {(formData.status === 'present' || formData.status === 'late') && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="checkIn"
            label="وقت الحضور"
            type="time"
            value={formData.checkIn}
            onChange={(e) => setFormData((prev) => ({ ...prev, checkIn: e.target.value }))}
            error={errors.checkIn}
            icon={Clock}
          />
          <Input
            id="checkOut"
            label="وقت الانصراف"
            type="time"
            value={formData.checkOut}
            onChange={(e) => setFormData((prev) => ({ ...prev, checkOut: e.target.value }))}
            error={errors.checkOut}
            icon={Clock}
          />
        </div>
      )}

      <Textarea
        id="notes"
        label="ملاحظات"
        value={formData.notes}
        onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
        rows={3}
        placeholder="أضف ملاحظات إضافية هنا"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        >
          حفظ
        </button>
      </div>
    </form>
  );
} 