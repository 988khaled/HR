'use client';

import Modal from '@/components/shared/Modal';
import DepartmentForm from './DepartmentForm';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    managerId: number;
  }) => void;
  initialData?: {
    id?: number;
    name: string;
    description: string;
    managerId: number;
  };
}

export default function DepartmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: DepartmentModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'تعديل بيانات القسم' : 'اضافة قسم جديد'}
    >
      <DepartmentForm onSubmit={onSubmit} onClose={onClose} initialData={initialData} />
    </Modal>
  );
} 