
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EmptyState from '@/components/EmptyState';
import JobCard from '@/components/JobCard';
import InterviewCard from '@/components/InterviewCard';
import AddJobForm from '@/components/AddJobForm';
import AddInterviewForm from '@/components/AddInterviewForm';
import { BriefcaseIcon, CalendarIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Initial placeholder data
const initialJobs = [
  {
    id: '1',
    company: 'TechCorp',
    role: 'Frontend Developer',
    jobId: 'TC-2023-42',
    appliedDate: '2023-06-15',
    email: 'hr@techcorp.com',
    status: 'applied'
  },
  {
    id: '2',
    company: 'Global Solutions',
    role: 'React Developer',
    jobId: 'GS-421',
    appliedDate: '2023-06-12',
    email: 'careers@gsolutions.com',
    status: 'interview'
  }
];

const initialInterviews = [
  {
    id: '1',
    company: 'TechCorp',
    date: '2023-06-20T14:00',
    platform: 'Zoom',
    link: 'https://zoom.us/j/123456789',
    interviewers: ['John Smith', 'Emma Johnson'],
    round: 'Technical',
    status: 'scheduled'
  },
  {
    id: '2',
    company: 'DataViz Inc',
    date: '2023-06-18T10:00',
    platform: 'GMeet',
    link: 'https://meet.google.com/abc-defg-hij',
    interviewers: ['Sarah Miller'],
    round: 'HR',
    status: 'completed',
    result: 'pending'
  }
];

export default function Index() {
  // State for jobs and interviews
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });
  
  const [interviews, setInterviews] = useState(() => {
    const savedInterviews = localStorage.getItem('interviews');
    return savedInterviews ? JSON.parse(savedInterviews) : initialInterviews;
  });
  
  // Form visibility state
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isAddingInterview, setIsAddingInterview] = useState(false);
  
  // Tab state (applications or interviews)
  const [activeTab, setActiveTab] = useState('applications');
  
  // Interview status filter (scheduled or completed)
  const [interviewFilter, setInterviewFilter] = useState('scheduled');
  
  // Save to local storage when data changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);
  
  useEffect(() => {
    localStorage.setItem('interviews', JSON.stringify(interviews));
  }, [interviews]);
  
  // Filter interviews based on status
  const filteredInterviews = interviews.filter(interview => {
    if (interviewFilter === 'scheduled') {
      return interview.status === 'scheduled';
    } else {
      return interview.status === 'completed';
    }
  });
  
  // Handlers
  const handleAddJob = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
    setIsAddingJob(false);
  };
  
  const handleAddInterview = (newInterview) => {
    setInterviews(prev => [newInterview, ...prev]);
    setIsAddingInterview(false);
  };
  
  const handleInterviewStatusChange = (id, status) => {
    setInterviews(prev => prev.map(interview => 
      interview.id === id ? { ...interview, status } : interview
    ));
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Application Tracker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (activeTab === 'applications') {
                  setIsAddingJob(true);
                } else {
                  setIsAddingInterview(true);
                }
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Add New
            </button>
          </div>
        </div>

        <div className="glass rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveTab('applications')}
            className={cn(
              "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              activeTab === 'applications' 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <BriefcaseIcon className="mr-1.5 h-4 w-4" />
            Applications
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={cn(
              "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              activeTab === 'interviews' 
                ? "bg-white text-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <CalendarIcon className="mr-1.5 h-4 w-4" />
            Interviews
          </button>
        </div>

        {activeTab === 'applications' ? (
          <>
            {isAddingJob ? (
              <AddJobForm 
                onSubmit={handleAddJob} 
                onCancel={() => setIsAddingJob(false)} 
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.length === 0 ? (
                  <div className="sm:col-span-2 lg:col-span-3">
                    <EmptyState 
                      title="No applications yet" 
                      description="Track your job applications by adding your first one."
                      icon={BriefcaseIcon}
                      onAction={() => setIsAddingJob(true)}
                    />
                  </div>
                ) : (
                  jobs.map(job => (
                    <JobCard key={job.id} job={job} onClick={() => {}} />
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {isAddingInterview ? (
              <AddInterviewForm 
                onSubmit={handleAddInterview} 
                onCancel={() => setIsAddingInterview(false)} 
              />
            ) : (
              <>
                <div className="glass rounded-lg p-1 inline-flex mb-4">
                  <button
                    onClick={() => setInterviewFilter('scheduled')}
                    className={cn(
                      "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      interviewFilter === 'scheduled' 
                        ? "bg-white text-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    Scheduled
                  </button>
                  <button
                    onClick={() => setInterviewFilter('completed')}
                    className={cn(
                      "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      interviewFilter === 'completed' 
                        ? "bg-white text-foreground shadow-sm" 
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    Completed
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredInterviews.length === 0 ? (
                    <div className="sm:col-span-2 lg:col-span-3">
                      <EmptyState 
                        title={`No ${interviewFilter} interviews`} 
                        description={interviewFilter === 'scheduled' 
                          ? "Schedule your upcoming interviews to keep track of them." 
                          : "Mark interviews as completed to track their status."
                        }
                        icon={CalendarIcon}
                        onAction={() => setIsAddingInterview(true)}
                      />
                    </div>
                  ) : (
                    filteredInterviews.map(interview => (
                      <InterviewCard 
                        key={interview.id} 
                        interview={interview} 
                        isCompleted={interviewFilter === 'completed'}
                        onStatusChange={(status) => handleInterviewStatusChange(interview.id, status)}
                      />
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
