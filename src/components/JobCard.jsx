
import React from 'react';
import { CalendarIcon, BriefcaseIcon, ChevronRightIcon, MailIcon, IdCardIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDistanceToNow } from 'date-fns';

export default function JobCard({ job, onClick }) {
  const { company, role, jobId, appliedDate, email, status } = job;
  
  return (
    <div 
      onClick={onClick}
      className="glass card-hover group relative cursor-pointer rounded-lg border p-4 transition-all overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{company}</h3>
            <StatusBadge status={status} />
          </div>
          <h4 className="text-sm font-medium text-muted-foreground">{role}</h4>
        </div>
        <ChevronRightIcon className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{formatDistanceToNow(new Date(appliedDate), { addSuffix: true })}</span>
        </div>
        {jobId && (
          <div className="flex items-center gap-1">
            <IdCardIcon className="h-3.5 w-3.5" />
            <span>{jobId}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-1 col-span-2 truncate">
            <MailIcon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{email}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
