
import React, { useState } from 'react';
import { CalendarIcon, XIcon, PlusIcon, MinusIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function AddInterviewForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company: '',
    date: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm'),
    platform: 'Zoom',
    link: '',
    interviewers: [''],
    round: 'Screening',
    status: 'scheduled'
  });

  const platforms = ['Zoom', 'GMeet', 'Slack', 'Other'];
  const rounds = ['Screening', 'Technical', 'HR', 'System Design', 'Behavioral', 'Final', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterviewerChange = (index, value) => {
    const updatedInterviewers = [...formData.interviewers];
    updatedInterviewers[index] = value;
    setFormData(prev => ({ ...prev, interviewers: updatedInterviewers }));
  };

  const addInterviewer = () => {
    setFormData(prev => ({ 
      ...prev, 
      interviewers: [...prev.interviewers, ''] 
    }));
  };

  const removeInterviewer = (index) => {
    const updatedInterviewers = [...formData.interviewers];
    updatedInterviewers.splice(index, 1);
    setFormData(prev => ({ ...prev, interviewers: updatedInterviewers }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedInterviewers = formData.interviewers.filter(i => i.trim() !== '');
    onSubmit({ 
      ...formData, 
      interviewers: cleanedInterviewers,
      id: Date.now().toString() 
    });
  };

  return (
    <div className="animate-scale-in glass rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Add New Interview</h2>
        <button 
          onClick={onCancel}
          className="rounded-full p-1 hover:bg-muted"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Enter company name"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date & Time
          </label>
          <div className="relative">
            <input
              id="date"
              name="date"
              type="datetime-local"
              required
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              value={formData.date}
              onChange={handleChange}
            />
            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="platform" className="text-sm font-medium">
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={formData.platform}
            onChange={handleChange}
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="link" className="text-sm font-medium">
            Link (optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Enter meeting link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Interviewer Names (optional)
          </label>
          <div className="space-y-2">
            {formData.interviewers.map((interviewer, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder={`Interviewer ${index + 1}`}
                  value={interviewer}
                  onChange={(e) => handleInterviewerChange(index, e.target.value)}
                />
                {index === 0 ? (
                  <button
                    type="button"
                    onClick={addInterviewer}
                    className="rounded-md border border-input p-2 hover:bg-accent"
                    aria-label="Add interviewer"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeInterviewer(index)}
                    className="rounded-md border border-input p-2 hover:bg-accent"
                    aria-label="Remove interviewer"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="round" className="text-sm font-medium">
            Round
          </label>
          <select
            id="round"
            name="round"
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            value={formData.round}
            onChange={handleChange}
          >
            {rounds.map(round => (
              <option key={round} value={round}>{round}</option>
            ))}
          </select>
        </div>
        
        <div className="pt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-ring"
          >
            Save Interview
          </button>
        </div>
      </form>
    </div>
  );
}
