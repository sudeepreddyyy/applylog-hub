
import React from 'react';
import { FileIcon, PlusIcon } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = FileIcon, actionLabel = "Add New", onAction }) {
  return (
    <div className="glass flex h-60 flex-col items-center justify-center rounded-lg border p-8 text-center animate-fade-in">
      <Icon className="h-12 w-12 text-muted-foreground opacity-50" />
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <button
        onClick={onAction}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        {actionLabel}
      </button>
    </div>
  );
}
