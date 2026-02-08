// frontend/components/TaskCard.tsx

'use client';

import { Task } from '@/types';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskCard({ task, onTaskUpdated, onTaskDeleted }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = async () => {
    try {
      await apiFetch(`/users/${task.user_id}/tasks/${task.id}/complete`, {
        method: 'PATCH',
      });
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await apiFetch(`/users/${task.user_id}/tasks/${task.id}`, {
          method: 'DELETE',
        });
        onTaskDeleted();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await apiFetch(`/users/${task.user_id}/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const priorityColors = {
    high: 'text-red-500 bg-red-500/10 border-red-500/20',
    medium: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  };

  return (
    <div className="relative group mb-4">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-xl px-6 py-4 transition-all duration-300 group-hover:border-white/10 group-hover:bg-[#0a0a0a]/80 shadow-xl">
        {isEditing ? (
          <TaskForm 
            initialTask={task} 
            onSubmit={handleUpdate} 
            onCancel={() => setIsEditing(false)} 
          />
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
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
                
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>

                <h3 className={`text-lg font-bold tracking-tight transition-all ${task.completed ? 'line-through text-gray-500 opacity-50' : 'text-white'}`}>
                  {task.title}
                </h3>
              </div>

              {task.description && (
                <p className="ml-8 text-sm text-gray-400 leading-relaxed">{task.description}</p>
              )}

              <div className="ml-8 mt-3 flex flex-wrap gap-2 items-center">
                {task.due_date && (
                  <span className={`text-[11px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 ${task.is_overdue ? 'text-red-400 border-red-500/30' : 'text-indigo-400'}`}>
                    Due {new Date(task.due_date).toLocaleString()}
                    {task.is_overdue && ' (OVERDUE)'}
                  </span>
                )}
                
                {task.recurrence_rule && (
                  <span className="text-[11px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-purple-400">
                    ↻ {task.recurrence_rule}
                  </span>
                )}

                {task.tags.map(tag => (
                  <span key={tag.id} className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end md:self-center">
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