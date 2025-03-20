'use client';

import { useState } from 'react';
import { User, Mail, Phone, Building2, Briefcase, Calendar, DollarSign, Plus, Minus } from 'lucide-react';
import Input from '@/components/shared/Input';
import Select from '@/components/shared/Select';
import { Employee } from '@/types/employee';

interface EmployeeFormProps {
  initialData?: Omit<Employee, 'id'>;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  onClose: () => void;
}

export default function EmployeeForm({ initialData, onSubmit, onClose }: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    department: initialData?.department || '',
    position: initialData?.position || '',
    joinDate: initialData?.joinDate || '',
    status: initialData?.status || 'active',
    salary: initialData?.salary || 0,
    dues: initialData?.dues || 0,
    obligations: initialData?.obligations || 0,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    joinDate: '',
    salary: '',
    dues: '',
    obligations: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      joinDate: '',
      salary: '',
      dues: '',
      obligations: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال اسم الموظف';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'يرجى إدخال البريد الإلكتروني';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'يرجى إدخال القسم';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'يرجى إدخال المنصب';
    }

    if (!formData.joinDate.trim()) {
      newErrors.joinDate = 'يرجى إدخال تاريخ الانضمام';
    }

    if (formData.salary < 0) {
      newErrors.salary = 'يجب أن يكون الراتب قيمة موجبة';
    }

    if (formData.dues < 0) {
      newErrors.dues = 'يجب أن تكون المستحقات قيمة موجبة';
    }

    if (formData.obligations < 0) {
      newErrors.obligations = 'يجب أن تكون المطلوبات قيمة موجبة';
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
        label="اسم الموظف"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        error={errors.name}
        icon={User}
        placeholder="أدخل اسم الموظف"
      />

      <Input
        id="email"
        label="البريد الإلكتروني"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        icon={Mail}
        placeholder="أدخل البريد الإلكتروني"
        dir="ltr"
      />

      <Input
        id="phone"
        label="رقم الهاتف"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        error={errors.phone}
        icon={Phone}
        placeholder="أدخل رقم الهاتف"
        dir="ltr"
      />

      <Input
        id="department"
        label="القسم"
        type="text"
        value={formData.department}
        onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
        error={errors.department}
        icon={Building2}
        placeholder="أدخل القسم"
      />

      <Input
        id="position"
        label="المنصب"
        type="text"
        value={formData.position}
        onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
        error={errors.position}
        icon={Briefcase}
        placeholder="أدخل المنصب"
      />

      <Input
        id="joinDate"
        label="تاريخ الانضمام"
        type="date"
        value={formData.joinDate}
        onChange={(e) => setFormData((prev) => ({ ...prev, joinDate: e.target.value }))}
        error={errors.joinDate}
        icon={Calendar}
      />

      <Input
        id="salary"
        label="الراتب"
        type="number"
        value={formData.salary}
        onChange={(e) => setFormData((prev) => ({ ...prev, salary: Number(e.target.value) }))}
        error={errors.salary}
        icon={DollarSign}
        placeholder="أدخل الراتب"
        min={0}
      />

      <Input
        id="dues"
        label="المستحقات"
        type="number"
        value={formData.dues}
        onChange={(e) => setFormData((prev) => ({ ...prev, dues: Number(e.target.value) }))}
        error={errors.dues}
        icon={Plus}
        placeholder="أدخل المستحقات"
        min={0}
      />

      <Input
        id="obligations"
        label="المطلوبات"
        type="number"
        value={formData.obligations}
        onChange={(e) => setFormData((prev) => ({ ...prev, obligations: Number(e.target.value) }))}
        error={errors.obligations}
        icon={Minus}
        placeholder="أدخل المطلوبات"
        min={0}
      />

      <Select
        id="status"
        label="الحالة"
        value={formData.status}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))
        }
      >
        <option value="active">نشط</option>
        <option value="inactive">غير نشط</option>
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