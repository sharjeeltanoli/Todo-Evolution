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
  const [priority, setPriority] = useState(initialTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialTask?.due_date ? initialTask.due_date.substring(0, 16) : '');
  const [recurrenceRule, setRecurrenceRule] = useState(initialTask?.recurrence_rule || '');
  const [tags, setTags] = useState(initialTask?.tags ? initialTask.tags.map(t => t.name).join(', ') : '');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setCompleted(initialTask.completed);
      setPriority(initialTask.priority);
      setDueDate(initialTask.due_date ? initialTask.due_date.substring(0, 16) : '');
      setRecurrenceRule(initialTask.recurrence_rule || '');
      setTags(initialTask.tags ? initialTask.tags.map(t => t.name).join(', ') : '');
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
      setPriority('medium');
      setDueDate('');
      setRecurrenceRule('');
      setTags('');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagList = tags.split(',').map(t => t.trim()).filter(t => t !== '');
    
    const taskData: TaskCreate | TaskUpdate = {
      title,
      description,
      priority,
      due_date: dueDate || undefined,
      recurrence_rule: recurrenceRule || undefined,
      tags: tagList,
      ...(initialTask ? { completed } : {})
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
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
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
            disabled={isSubmitting}
          ></textarea>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
            className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
            disabled={isSubmitting}
          >
            <option value="high" className="bg-gray-900">High</option>
            <option value="medium" className="bg-gray-900">Medium</option>
            <option value="low" className="bg-gray-900">Low</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="recurrence" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Recurrence (RRULE)
          </label>
          <input
            type="text"
            id="recurrence"
            value={recurrenceRule}
            onChange={(e) => setRecurrenceRule(e.target.value)}
            placeholder="FREQ=DAILY"
            className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, urgent"
            className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {initialTask && (
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
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
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