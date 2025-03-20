'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AttendanceModal from '@/components/features/Attendance/AttendanceModal';

export default function RecordAttendancePage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsModalOpen(false);
    router.push('/attendance');
  };

  const handleSubmit = (data: {
    employeeId: number;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
    notes: string;
  }) => {
    // Here you would typically make an API call to save the attendance record
    console.log('Attendance data:', data);
    handleClose();
  };

  return (
    <AttendanceModal
      isOpen={isModalOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
} 