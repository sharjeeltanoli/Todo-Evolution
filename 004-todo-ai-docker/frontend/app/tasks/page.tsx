// frontend/app/tasks/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch, getEventStreamUrl } from '@/lib/api';
import { Task, TaskCreate, TaskUpdate, Tag } from '@/types';
import { getCurrentUserId, getCurrentUser } from '@/lib/auth';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Advanced Filter/Sort State
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('due_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const router = useRouter();
  const userId = getCurrentUserId();
  const user = getCurrentUser();

  // Real-time Sync Effect
  useEffect(() => {
    if (userId === null) return;
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) return;

    const url = getEventStreamUrl(token);
    const eventSource = new EventSource(url);
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'connected') return;
        
        console.log('Real-time event received:', data.topic || data.type);
        // Refresh data on any relevant event
        fetchTasks();
        fetchTags();
      } catch (err) {
        console.error('Error parsing SSE event:', err);
      }
    };
    
    eventSource.onerror = (err) => {
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, [userId]);

  useEffect(() => {
    if (userId === null) {
      router.push('/');
      return;
    }
    fetchTasks();
    fetchTags();
  }, [userId, router, filter, priorityFilter, tagFilter, sortBy, sortOrder]);

  const fetchTasks = async () => {
    setLoading(true);
    if (userId === null) return;

    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (priorityFilter !== 'all') params.append('priority', priorityFilter);
      if (tagFilter !== 'all') params.append('tags', tagFilter);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sort_by', sortBy);
      params.append('sort_order', sortOrder);

      const fetchedTasks = await apiFetch<Task[]>(`/users/${userId}/tasks?${params.toString()}`);
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    if (userId === null) return;
    try {
      const fetchedTags = await apiFetch<Tag[]>(`/users/${userId}/tags`);
      setTags(fetchedTags);
    } catch (err) {
      console.error('Failed to fetch tags');
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
      fetchTasks();
      fetchTags();
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
      setEditingTask(null);
      fetchTasks();
      fetchTags();
    } catch (err: any) {
      setError(err.message || 'Failed to update task.');
    }
  };

  // Local filtering for instant search feel
  const filteredTasks = tasks.filter(task => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return task.title.toLowerCase().includes(query) || 
             task.description?.toLowerCase().includes(query);
    }
    return true;
  });

  if (userId === null) return null;

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.12)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="container mx-auto p-4 max-w-5xl relative z-10 pt-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              Todo <span className="text-indigo-500">Evolution</span>
            </h1>
            <p className="text-gray-500 mt-1 font-bold text-sm tracking-widest uppercase">
              Phase V: Part A - Advanced Task Manager
            </p>
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="mt-4 md:mt-0 px-6 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            + New Task
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-all"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select 
            className="bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500/50 transition-all uppercase tracking-tighter font-bold"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="due_date">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="created_at">Sort by Created</option>
          </select>
        </div>

        {/* Tag Cloud */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setTagFilter('all')}
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                tagFilter === 'all' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
              }`}
            >
              #all
            </button>
            {tags.map(tag => (
              <button 
                key={tag.id}
                onClick={() => setTagFilter(tag.name)}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                  tagFilter === tag.name ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                #{tag.name}
              </button>
            ))}
          </div>
        )}

        {(showCreateForm || editingTask) && (
          <div className="mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25"></div>
            <div className="relative bg-zinc-950 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-black mb-6 uppercase italic">
                {showCreateForm ? 'Initialize New Objective' : 'Modify Objective'}
              </h2>
              <TaskForm 
                initialTask={editingTask}
                onSubmit={showCreateForm ? handleCreateTask : handleUpdateTask} 
                onCancel={() => { setShowCreateForm(false); setEditingTask(null); }} 
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center"><p className="text-indigo-500 font-black animate-pulse tracking-[0.3em] uppercase">Syncing...</p></div>
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onTaskUpdated={fetchTasks} 
            onTaskDeleted={fetchTasks}
          />
        )}
      </main>
    </div>
  );
}