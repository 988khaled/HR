'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DepartmentModal from '@/components/features/Department/DepartmentModal';

export default function AddDepartmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsModalOpen(false);
    router.push('/departments');
  };

  const handleSubmit = (data: {
    name: string;
    description: string;
    managerId: number;
  }) => {
    // Here you would typically make an API call to save the department
    console.log('Department data:', data);
    handleClose();
  };

  return (
    <DepartmentModal
      isOpen={isModalOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
} 