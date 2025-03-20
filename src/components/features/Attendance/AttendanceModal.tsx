'use client';

import Modal from '@/components/shared/Modal';
import AttendanceForm from './AttendanceForm';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    employeeId: number;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AttendanceModal({
  isOpen,
  onClose,
  onSubmit,
}: AttendanceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة سجل حضور">
      <AttendanceForm onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
} 