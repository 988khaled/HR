'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import DepartmentsTable from '@/components/features/Departments/DepartmentsTable';
import SearchBar from '@/components/features/Departments/SearchBar';
import AddDepartmentModal from '@/components/features/Departments/AddDepartmentModal';
import { toast } from 'sonner';

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
  const [selectedDepartment, setSelectedDepartment] = useState<typeof mockDepartments[0] | null>(null);

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
    toast.success('تم إضافة القسم بنجاح');
  };

  const handleEditDepartment = (department: typeof mockDepartments[0]) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDeleteDepartment = (departmentId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      setDepartments(departments.filter((dept) => dept.id !== departmentId));
      toast.success('تم حذف القسم بنجاح');
    }
  };

  const handleUpdateDepartment = (data: { name: string; description: string; manager: string }) => {
    if (selectedDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id
            ? { ...dept, ...data }
            : dept
        )
      );
      setIsModalOpen(false);
      setSelectedDepartment(null);
      toast.success('تم تحديث القسم بنجاح');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedDepartment(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          <Plus className="h-5 w-5" />
          {selectedDepartment ? 'تعديل القسم' : 'إضافة قسم جديد'}
        </button>
        <h1 className="text-2xl font-bold">الأقسام</h1>
      </div>

      <div className="w-full max-w-md">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <DepartmentsTable
        departments={filteredDepartments}
        onEdit={handleEditDepartment}
        onDelete={handleDeleteDepartment}
      />

      <AddDepartmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDepartment(null);
        }}
        onSubmit={selectedDepartment ? handleUpdateDepartment : handleAddDepartment}
        initialData={selectedDepartment}
      />
    </div>
  );
} 