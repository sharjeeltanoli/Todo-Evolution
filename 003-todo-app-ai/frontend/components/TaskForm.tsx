// frontend/components/TaskForm.tsx

'use client';

import { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '@/types';

interface TaskFormProps {
  initialTask?: Task | null; // For editing existing tasks
  onSubmit: (taskData: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function TaskForm({ initialTask, onSubmit, onCancel, isSubmitting = false }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [completed, setCompleted] = useState(initialTask?.completed || false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCompleted(initialTask.completed);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: TaskCreate | TaskUpdate = initialTask
      ? { title, description, completed } // For update
      : { title, description }; // For create

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
          disabled={isSubmitting}
        ></textarea>
      </div>
      {initialTask && ( // Only show completed status for existing tasks
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="peer h-5 w-5 bg-white/5 border border-white/20 rounded cursor-pointer appearance-none checked:bg-indigo-500 checked:border-indigo-500 transition-all"
              disabled={isSubmitting}
            />
            <svg
              className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block left-0.5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <label htmlFor="completed" className="ml-3 block text-sm font-bold text-gray-300">
            Completed
          </label>
        </div>
      )}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialTask ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
