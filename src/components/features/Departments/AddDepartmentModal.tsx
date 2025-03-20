'use client';

import Modal from '@/components/shared/Modal';
import AddDepartmentForm from './AddDepartmentForm';

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; manager: string }) => void;
}

export default function AddDepartmentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddDepartmentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="اضافة قسم جديد">
      <AddDepartmentForm onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
} 