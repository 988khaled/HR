'use client';

import { useState } from 'react';

interface AddDepartmentFormProps {
  onSubmit: (data: { name: string; description: string; manager: string }) => void;
  onClose: () => void;
}

export default function AddDepartmentForm({ onSubmit, onClose }: AddDepartmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    manager: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    manager: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      manager: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'اسم القسم مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'الوصف مطلوب';
    }

    if (!formData.manager.trim()) {
      newErrors.manager = 'المدير مطلوب';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          اسم القسم
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } bg-white p-2 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          الوصف
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={`w-full rounded-lg border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } bg-white p-2 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="manager" className="mb-1 block text-sm font-medium text-gray-700">
          المدير
        </label>
        <input
          type="text"
          id="manager"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          className={`w-full rounded-lg border ${
            errors.manager ? 'border-red-500' : 'border-gray-300'
          } bg-white p-2 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        />
        {errors.manager && <p className="mt-1 text-sm text-red-500">{errors.manager}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          حفظ
        </button>
      </div>
    </form>
  );
} 