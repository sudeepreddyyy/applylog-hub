
import React, { useState } from 'react';
import { CalendarIcon, XIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function AddJobForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jobId: '',
    appliedDate: format(new Date(), 'yyyy-MM-dd'),
    email: '',
    status: 'applied'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: Date.now().toString() });
  };

  return (
    <div className="animate-scale-in glass rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Add New Application</h2>
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
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Enter job role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="jobId" className="text-sm font-medium">
            Job ID (optional)
          </label>
          <input
            id="jobId"
            name="jobId"
            type="text"
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Enter job ID"
            value={formData.jobId}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="appliedDate" className="text-sm font-medium">
            Applied Date
          </label>
          <div className="relative">
            <input
              id="appliedDate"
              name="appliedDate"
              type="date"
              required
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              value={formData.appliedDate}
              onChange={handleChange}
            />
            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Enter contact email"
            value={formData.email}
            onChange={handleChange}
          />
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
            Save Application
          </button>
        </div>
      </form>
    </div>
  );
}
