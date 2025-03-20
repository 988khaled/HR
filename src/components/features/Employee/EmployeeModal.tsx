'use client';

import Modal from '@/components/shared/Modal';
import EmployeeForm from './EmployeeForm';
import { Employee } from '@/types/employee';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  initialData?: Omit<Employee, 'id'>;
}

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: EmployeeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'تعديل بيانات الموظف' : 'إضافة موظف جديد'}
    >
      <EmployeeForm onSubmit={onSubmit} onClose={onClose} initialData={initialData} />
    </Modal>
  );
} 