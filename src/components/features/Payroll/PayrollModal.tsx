'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import Modal from '@/components/shared/Modal';
import Input from '@/components/shared/Input';

interface PayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { month: string; year: string; notes: string }) => void;
}

export default function PayrollModal({ isOpen, onClose, onSubmit }: PayrollModalProps) {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({
    month: '',
    year: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      month: '',
      year: '',
    });

    // Validate form
    let hasError = false;
    const newErrors = {
      month: '',
      year: '',
    };

    if (!month) {
      newErrors.month = 'يرجى اختيار الشهر';
      hasError = true;
    }

    if (!year) {
      newErrors.year = 'يرجى إدخال السنة';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onSubmit({
      month,
      year,
      notes,
    });

    // Reset form
    setMonth('');
    setYear(new Date().getFullYear().toString());
    setNotes('');
    onClose();
  };

  const months = [
    { value: '01', label: 'يناير' },
    { value: '02', label: 'فبراير' },
    { value: '03', label: 'مارس' },
    { value: '04', label: 'أبريل' },
    { value: '05', label: 'مايو' },
    { value: '06', label: 'يونيو' },
    { value: '07', label: 'يوليو' },
    { value: '08', label: 'أغسطس' },
    { value: '09', label: 'سبتمبر' },
    { value: '10', label: 'أكتوبر' },
    { value: '11', label: 'نوفمبر' },
    { value: '12', label: 'ديسمبر' },
  ];

  return (
    <Modal title="إنشاء مسير رواتب" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="month"
              className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white"
            >
              الشهر
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="">اختر الشهر</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            {errors.month && (
              <p className="mt-1.5 text-sm font-medium text-red-500">{errors.month}</p>
            )}
          </div>

          <Input
            id="year"
            type="number"
            label="السنة"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={errors.year}
            min={2000}
            max={2100}
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
              placeholder="أضف ملاحظات حول مسير الرواتب..."
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
            <Calendar className="h-4 w-4" />
            إنشاء المسير
          </button>
        </div>
      </form>
    </Modal>
  );
} 