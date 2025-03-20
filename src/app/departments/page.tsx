'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import DepartmentsTable from '@/components/features/Departments/DepartmentsTable';
import SearchBar from '@/components/features/Departments/SearchBar';
import AddDepartmentModal from '@/components/features/Departments/AddDepartmentModal';

// Mock data - replace with actual API call
const mockDepartments = [
  {
    id: 1,
    name: 'قسم تكنولوجيا المعلومات',
    description: 'يدير البنية التحتية التقنية والبرمجيات',
    manager: 'أحمد محمد',
    employeeCount: 15,
  },
  {
    id: 2,
    name: 'قسم الموارد البشرية',
    description: 'يدير شؤون الموظفين والتوظيف',
    manager: 'سارة أحمد',
    employeeCount: 8,
  },
  {
    id: 3,
    name: 'قسم المالية',
    description: 'يدير الشؤون المالية والمحاسبة',
    manager: 'محمد علي',
    employeeCount: 10,
  },
];

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState(mockDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDepartments = departments.filter((department) =>
    department.name.includes(searchQuery) ||
    department.description.includes(searchQuery) ||
    department.manager.includes(searchQuery)
  );

  const handleAddDepartment = (data: { name: string; description: string; manager: string }) => {
    const newDepartment = {
      id: departments.length + 1,
      ...data,
      employeeCount: 0,
    };
    setDepartments([...departments, newDepartment]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          <Plus className="h-5 w-5" />
          إضافة قسم جديد
        </button>
        <h1 className="text-2xl font-bold">الأقسام</h1>
      </div>

      <div className="w-full max-w-md">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <DepartmentsTable departments={filteredDepartments} />

      <AddDepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDepartment}
      />
    </div>
  );
} 