// frontend/components/TaskCard.tsx

'use client';

import { Task } from '@/types';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void; // Callback to refresh task list
  onTaskDeleted: () => void; // Callback to refresh task list
}

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted }: TaskCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleToggleComplete = async () => {
    try {
      // Assuming a PATCH endpoint exists for toggling completion
      await apiFetch(`/users/${task.user_id}/tasks/${task.id}/complete`, {
        method: 'PATCH',
      });
      onTaskUpdated(); // Refresh the list
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      alert('Failed to update task status.');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await apiFetch(`/users/${task.user_id}/tasks/${task.id}`, {
          method: 'DELETE',
        });
        onTaskDeleted(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  const handleSave = async () => {
    try {
      await apiFetch(`/users/${task.user_id}/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          completed: task.completed,
        }),
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  return (
    <div className="relative group mb-4">
      {/* Outer Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-xl px-6 py-4 transition-all duration-300 group-hover:border-white/10 group-hover:bg-[#0a0a0a]/80 shadow-xl">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
              placeholder="Task Title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white sm:text-sm p-3 outline-none transition-all"
              placeholder="Description (optional)"
              rows={3}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggleComplete}
                    className="peer h-5 w-5 bg-white/5 border border-white/20 rounded cursor-pointer appearance-none checked:bg-indigo-500 checked:border-indigo-500 transition-all"
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
                <h3 className={`ml-4 text-lg font-bold tracking-tight transition-all ${task.completed ? 'line-through text-gray-500 opacity-50' : 'text-white'}`}>
                  {task.title}
                </h3>
              </div>
              {task.description && (
                <p className="ml-9 mt-1.5 text-sm text-gray-400 leading-relaxed">{task.description}</p>
              )}
              <p className="ml-9 mt-2 text-[10px] font-bold text-indigo-500/50 uppercase tracking-widest">
                Created {new Date(task.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                title="Edit Task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete Task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
