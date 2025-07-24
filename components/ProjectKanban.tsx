'use client';

import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  tags: string[];
  estimatedHours: number;
  actualHours?: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export default function ProjectKanban({ projectId }: { projectId: number }) {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 1,
          title: 'Design wireframes',
          description: 'Create initial wireframes for the main pages',
          assignee: 'Hana Tesfaye',
          priority: 'high',
          dueDate: '2024-03-01',
          tags: ['design', 'wireframes'],
          estimatedHours: 8
        },
        {
          id: 2,
          title: 'Set up development environment',
          description: 'Configure local development setup and dependencies',
          assignee: 'Dawit Bekele',
          priority: 'medium',
          dueDate: '2024-02-28',
          tags: ['setup', 'development'],
          estimatedHours: 4
        }
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: 3,
          title: 'Implement user authentication',
          description: 'Build login and registration functionality',
          assignee: 'Hana Tesfaye',
          priority: 'high',
          dueDate: '2024-03-05',
          tags: ['development', 'authentication'],
          estimatedHours: 12,
          actualHours: 8
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: 4,
          title: 'Homepage design',
          description: 'Review and approve homepage design mockups',
          assignee: 'Meron Alemayehu',
          priority: 'medium',
          dueDate: '2024-02-29',
          tags: ['design', 'review'],
          estimatedHours: 2
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 5,
          title: 'Project setup and planning',
          description: 'Initial project setup and requirement analysis',
          assignee: 'Team',
          priority: 'high',
          dueDate: '2024-02-15',
          tags: ['planning', 'setup'],
          estimatedHours: 6,
          actualHours: 6
        }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    setColumns(prevColumns => {
      const newColumns = prevColumns.map(column => {
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask]
          };
        }
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggedTask.id)
        };
      });
      return newColumns;
    });

    setDraggedTask(null);
  };

  const addNewTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: 'New Task',
      description: 'Task description',
      assignee: 'Unassigned',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      tags: [],
      estimatedHours: 1
    };

    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Project Kanban Board</h3>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8">
            <option>All Team Members</option>
            <option>Hana Tesfaye</option>
            <option>Dawit Bekele</option>
            <option>Meron Alemayehu</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8">
            <option>All Priorities</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-gray-50 rounded-xl p-4 min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800">{column.title}</h4>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {column.tasks.length}
                </span>
                <button
                  onClick={() => addNewTask(column.id)}
                  className="w-6 h-6 flex items-center justify-center bg-[#1F3D3A] text-white rounded-full hover:bg-[#2a5248] transition-colors cursor-pointer"
                >
                  <i className="ri-add-line text-xs"></i>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  onClick={() => setEditingTask(task)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-800 text-sm">{task.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <i className="ri-user-line mr-1"></i>
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-line mr-1"></i>
                      <span>{task.dueDate}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        Est: {task.estimatedHours}h
                      </span>
                      {task.actualHours && (
                        <span className="text-gray-500">
                          Actual: {task.actualHours}h
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">Edit Task</h3>
                <button
                  onClick={() => setEditingTask(null)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                    <input
                      type="text"
                      defaultValue={editingTask.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      defaultValue={editingTask.priority}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    defaultValue={editingTask.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                    <select
                      defaultValue={editingTask.assignee}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                    >
                      <option>Hana Tesfaye</option>
                      <option>Dawit Bekele</option>
                      <option>Meron Alemayehu</option>
                      <option>Samuel Girma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      defaultValue={editingTask.dueDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      defaultValue={editingTask.estimatedHours}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-[#1F3D3A] text-white py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                  >
                    Update Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTask(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}