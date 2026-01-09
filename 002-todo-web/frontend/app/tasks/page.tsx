// frontend/app/tasks/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { Task, TaskCreate, TaskUpdate } from '@/types';
import { getCurrentUserId, getCurrentUser } from '@/lib/auth'; // To get the user ID and name
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State for task being edited
  const router = useRouter();
  const userId = getCurrentUserId(); // Get user ID from JWT
  const user = getCurrentUser(); // Get full user object

  useEffect(() => {
    if (userId === null) {
      router.push('/'); // Redirect if not authenticated
      return;
    }
    fetchTasks();
  }, [userId, router]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    if (userId === null) return; // Should already be handled by redirect

    try {
      const fetchedTasks = await apiFetch<Task[]>(`/users/${userId}/tasks`);
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks.');
      // If unauthorized, redirect to login
      if (err.message.includes('unauthorized') || err.message.includes('Unauthorized')) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskCreate) => {
    if (userId === null) return;
    try {
      await apiFetch(`/users/${userId}/tasks`, {
        method: 'POST',
        body: JSON.stringify(taskData),
      });
      setShowCreateForm(false);
      fetchTasks(); // Refresh tasks after creation
    } catch (err: any) {
      setError(err.message || 'Failed to create task.');
    }
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (userId === null || editingTask === null) return;
    try {
      await apiFetch(`/users/${userId}/tasks/${editingTask.id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
      });
      setEditingTask(null); // Close edit form
      fetchTasks(); // Refresh tasks after update
    } catch (err: any) {
      setError(err.message || 'Failed to update task.');
    }
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><p className="text-gray-400">Loading tasks...</p></div>;
  if (error) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
  if (userId === null) return null; // Should redirect before this

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background grid and radial glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.12)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="container mx-auto p-4 max-w-4xl relative z-10 pt-24">
        <div className="mb-8 border-b border-white/10 pb-4">
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">Your Tasks</h1>
          {user && (
            <p className="text-gray-400 mt-2 text-lg">
              Welcome back, <span className="font-semibold text-indigo-400">{user.name}</span>! 
              Manage your daily goals below.
            </p>
          )}
        </div>
        
        <button 
          onClick={() => setShowCreateForm(true)}
          className="mb-8 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
        >
          + Add New Task
        </button>

        {/* Statistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Total Tasks */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-white/20 transition-colors">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Tasks</p>
              <p className="text-2xl font-black text-white mt-1 tracking-tight">{tasks.length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
               <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-amber-500/20 transition-colors">
            <div>
              <p className="text-xs font-bold text-amber-500/70 uppercase tracking-widest">Pending</p>
              <p className="text-2xl font-black text-amber-400 mt-1 tracking-tight">{tasks.filter(t => !t.completed).length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-emerald-500/20 transition-colors">
            <div>
              <p className="text-xs font-bold text-emerald-500/70 uppercase tracking-widest">Completed</p>
              <p className="text-2xl font-black text-emerald-400 mt-1 tracking-tight">{tasks.filter(t => t.completed).length}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4 text-white">Create New Task</h2>
              <TaskForm 
                onSubmit={handleCreateTask} 
                onCancel={() => setShowCreateForm(false)} 
              />
            </div>
          </div>
        )}

        {editingTask && (
          <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 transition duration-1000"></div>
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4 text-white">Edit Task</h2>
              <TaskForm 
                initialTask={editingTask}
                onSubmit={handleUpdateTask} 
                onCancel={() => setEditingTask(null)} 
              />
            </div>
          </div>
        )}

        <TaskList 
          tasks={tasks} 
          onTaskUpdated={handleTaskUpdated} 
          onTaskDeleted={handleTaskDeleted} 
        />
      </main>
    </div>
  );
}
