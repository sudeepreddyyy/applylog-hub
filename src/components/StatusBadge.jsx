
import React from 'react';
import { cn } from '@/lib/utils';

const statusStyles = {
  applied: "bg-blue-100 text-blue-800 border-blue-200",
  interview: "bg-amber-100 text-amber-800 border-amber-200",
  offer: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  scheduled: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-teal-100 text-teal-800 border-teal-200",
  pending: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function StatusBadge({ status, className }) {
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <span className={cn(
      "status-badge border",
      statusStyles[status] || statusStyles.pending,
      className
    )}>
      {statusText}
    </span>
  );
}
