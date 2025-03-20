'use client';

import { useState } from 'react';
import { Plus, Search, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import Input from '@/components/shared/Input';
import DeductionModal from '@/components/features/Deduction/DeductionModal';

interface Deduction {
  id: number;
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  description: string;
}

const initialDeductions: Deduction[] = [
  {
    id: 1,
    name: 'التأمينات الاجتماعية',
    type: 'percentage',
    value: 10.5,
    description: 'خصم إلزامي للتأمينات الاجتماعية',
  },
  {
    id: 2,
    name: 'التأمين الصحي',
    type: 'fixed',
    value: 100,
    description: 'خصم شهري للتأمين الصحي',
  },
];

export default function DeductionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deductions, setDeductions] = useState<Deduction[]>(initialDeductions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeduction, setSelectedDeduction] = useState<Deduction | null>(null);

  const filteredDeductions = deductions.filter((deduction) =>
    deduction.name.includes(searchTerm) || deduction.description.includes(searchTerm)
  );

  const handleSubmit = (data: Omit<Deduction, 'id'>) => {
    if (selectedDeduction) {
      // Update existing deduction
      setDeductions((prev) =>
        prev.map((d) =>
          d.id === selectedDeduction.id ? { ...data, id: selectedDeduction.id } : d
        )
      );
      toast.success('تم تحديث الاستقطاع بنجاح');
    } else {
      // Add new deduction
      const newId = Math.max(...deductions.map((d) => d.id)) + 1;
      setDeductions((prev) => [...prev, { ...data, id: newId }]);
      toast.success('تم إضافة الاستقطاع بنجاح');
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الاستقطاع؟')) {
      setDeductions((prev) => prev.filter((d) => d.id !== id));
      toast.success('تم حذف الاستقطاع بنجاح');
    }
  };

  const handleEdit = (deduction: Deduction) => {
    setSelectedDeduction(deduction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeduction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">الاستقطاعات</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          إضافة استقطاع
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث في الاستقطاعات..."
            className="max-w-xs"
            icon={Search}
          />
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            إجمالي النتائج: {filteredDeductions.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-right dark:border-gray-700">
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الاسم
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  النوع
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  القيمة
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الوصف
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDeductions.map((deduction) => (
                <tr key={deduction.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {deduction.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {deduction.type === 'fixed' ? 'ثابت' : 'نسبة مئوية'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {deduction.type === 'fixed' 
                      ? `${deduction.value} ريال`
                      : `${deduction.value}%`
                    }
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {deduction.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(deduction)}
                        className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(deduction.id)}
                        className="rounded-lg p-1 text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
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
      </div>

      <DeductionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedDeduction || undefined}
      />
    </div>
  );
} 