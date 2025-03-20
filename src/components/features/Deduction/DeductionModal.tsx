'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface DeductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    type: 'fixed' | 'percentage';
    value: number;
    description: string;
  }) => void;
  initialData?: {
    name: string;
    type: 'fixed' | 'percentage';
    value: number;
    description: string;
  };
}

export default function DeductionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DeductionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'fixed' as const,
    value: 0,
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {initialData ? 'تعديل استقطاع' : 'إضافة استقطاع جديد'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              اسم الاستقطاع
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              نوع الاستقطاع
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as 'fixed' | 'percentage' })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="fixed">ثابت</option>
              <option value="percentage">نسبة مئوية</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="value"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {formData.type === 'fixed' ? 'القيمة (ريال)' : 'النسبة المئوية (%)'}
            </label>
            <input
              type="number"
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
              min={0}
              max={formData.type === 'percentage' ? 100 : undefined}
              step={formData.type === 'percentage' ? 0.01 : 1}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              الوصف
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {initialData ? 'تحديث' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 