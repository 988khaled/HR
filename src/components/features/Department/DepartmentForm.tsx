'use client';

import { useState } from 'react';
import { Building2, FileText } from 'lucide-react';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import Textarea from '@/components/shared/Textarea';

interface DepartmentFormProps {
  initialData?: {
    id?: number;
    name: string;
    description: string;
    managerId: number;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    managerId: number;
  }) => void;
  onClose: () => void;
}

export default function DepartmentForm({ initialData, onSubmit, onClose }: DepartmentFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    managerId: initialData?.managerId || 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    managerId: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      managerId: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال اسم القسم';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'يرجى إدخال وصف القسم';
    }

    if (!formData.managerId) {
      newErrors.managerId = 'يرجى اختيار مدير القسم';
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
      <Input
        id="name"
        label="اسم القسم"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        error={errors.name}
        icon={Building2}
        placeholder="أدخل اسم القسم"
      />

      <Textarea
        id="description"
        label="الوصف"
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        error={errors.description}
        icon={FileText}
        placeholder="أدخل وصف القسم"
        rows={3}
      />

      <Select
        id="managerId"
        label="مدير القسم"
        value={formData.managerId || ''}
        onChange={(e) => setFormData((prev) => ({ ...prev, managerId: Number(e.target.value) }))}
        error={errors.managerId}
      >
        <option value="">اختر مدير القسم</option>
        <option value="1">أحمد محمد</option>
        <option value="2">محمد علي</option>
        <option value="3">فاطمة أحمد</option>
      </Select>

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
          {initialData ? 'تحديث' : 'إضافة'}
        </button>
      </div>
    </form>
  );
} 