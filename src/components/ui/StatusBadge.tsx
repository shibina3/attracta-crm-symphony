
import React from "react";
import { LeadStatus } from "@/lib/types";
import { getStatusColor } from "@/lib/data";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
  const colorClasses = getStatusColor(status);
  
  return (
    <span className={cn(baseClasses, colorClasses, className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
