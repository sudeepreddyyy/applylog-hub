
import React from 'react';
import { CalendarIcon, VideoIcon, Clock1Icon, UsersIcon, LinkIcon, CircleCheckIcon, XCircleIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function InterviewCard({ interview, isCompleted = false, onStatusChange }) {
  const { company, date, platform, link, interviewers, round, status } = interview;
  
  // Determine platform icon
  const getPlatformIcon = () => {
    switch (platform.toLowerCase()) {
      case 'zoom':
        return <VideoIcon className="h-4 w-4 text-blue-500" />;
      case 'gmeet':
        return <VideoIcon className="h-4 w-4 text-green-500" />;
      case 'slack':
        return <VideoIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <VideoIcon className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="glass card-hover relative rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{company}</h3>
            <StatusBadge status={isCompleted ? status : 'scheduled'} />
          </div>
          <h4 className="text-sm font-medium">{round}</h4>
        </div>
        {isCompleted ? (
          <div className="flex gap-1">
            <button 
              onClick={() => onStatusChange && onStatusChange('offer')}
              className={cn(
                "rounded-md p-1.5 transition-colors", 
                status === 'offer' ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground hover:bg-accent"
              )}
              aria-label="Mark as offer received"
            >
              <CircleCheckIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onStatusChange && onStatusChange('rejected')}
              className={cn(
                "rounded-md p-1.5 transition-colors", 
                status === 'rejected' ? "bg-red-100 text-red-800" : "bg-muted text-muted-foreground hover:bg-accent"
              )}
              aria-label="Mark as rejected"
            >
              <XCircleIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => onStatusChange && onStatusChange('completed')}
            className="rounded-md bg-muted p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Mark as completed"
          >
            <CircleCheckIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{format(new Date(date), 'PPP')}</span>
          <Clock1Icon className="ml-2 h-3.5 w-3.5" />
          <span>{format(new Date(date), 'p')}</span>
        </div>
        <div className="flex items-center gap-1">
          {getPlatformIcon()}
          <span>{platform}</span>
        </div>
        {link && (
          <div className="flex items-center gap-1">
            <LinkIcon className="h-3.5 w-3.5" />
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
              Meeting Link
            </a>
          </div>
        )}
        {interviewers && interviewers.length > 0 && (
          <div className="flex items-center gap-1">
            <UsersIcon className="h-3.5 w-3.5" />
            <span>{interviewers.join(', ')}</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
