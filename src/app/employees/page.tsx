'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import EmployeeTable from '@/components/features/Employee/EmployeeTable';
import EmployeeModal from '@/components/features/Employee/EmployeeModal';
import { Employee } from '@/types/employee';

// Mock data for demonstration
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    department: 'تقنية المعلومات',
    position: 'مطور برمجيات',
    joinDate: '2024-01-15',
    status: 'active',
    salary: 8000,
    dues: 500,
    obligations: 200,
  },
  {
    id: 2,
    name: 'سارة عبدالله',
    email: 'sara@example.com',
    phone: '+966 55 987 6543',
    department: 'الموارد البشرية',
    position: 'مدير الموارد البشرية',
    joinDate: '2023-11-01',
    status: 'active',
    salary: 10000,
    dues: 800,
    obligations: 300,
  },
  {
    id: 3,
    name: 'محمد علي',
    email: 'mohammed@example.com',
    phone: '+966 54 456 7890',
    department: 'المالية',
    position: 'محاسب',
    joinDate: '2023-08-20',
    status: 'inactive',
    salary: 6000,
    dues: 300,
    obligations: 150,
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddEmployee = (data: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...data,
      id: employees.length + 1,
    };
    setEmployees([...employees, newEmployee]);
    setIsModalOpen(false);
  };

  const handleEditEmployee = (data: Omit<Employee, 'id'>) => {
    if (selectedEmployee) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...data, id: emp.id } : emp
      );
      setEmployees(updatedEmployees);
      setSelectedEmployee(undefined);
      setIsModalOpen(false);
    }
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">الموظفين</h1>
        <button
          onClick={() => {
            setSelectedEmployee(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-[#28A745] px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          <Plus className="h-5 w-5" />
          إضافة موظف
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن موظف..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteEmployee}
      />

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(undefined);
        }}
        onSubmit={selectedEmployee ? handleEditEmployee : handleAddEmployee}
        initialData={selectedEmployee}
      />
    </div>
  );
} 