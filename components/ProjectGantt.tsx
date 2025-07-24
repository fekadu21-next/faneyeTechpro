'use client';

import { useState, useEffect } from 'react';

interface GanttTask {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: number[];
  assignee: string;
  category: string;
}

export default function ProjectGantt({ projectId }: { projectId: number }) {
  const [tasks, setTasks] = useState<GanttTask[]>([
    {
      id: 1,
      name: 'Project Planning & Setup',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      progress: 100,
      assignee: 'Project Manager',
      category: 'Planning'
    },
    {
      id: 2,
      name: 'Requirements Analysis',
      startDate: '2024-02-10',
      endDate: '2024-02-25',
      progress: 90,
      dependencies: [1],
      assignee: 'Business Analyst',
      category: 'Analysis'
    },
    {
      id: 3,
      name: 'UI/UX Design',
      startDate: '2024-02-20',
      endDate: '2024-03-10',
      progress: 75,
      dependencies: [2],
      assignee: 'Dawit Bekele',
      category: 'Design'
    },
    {
      id: 4,
      name: 'Frontend Development',
      startDate: '2024-03-01',
      endDate: '2024-04-15',
      progress: 40,
      dependencies: [3],
      assignee: 'Hana Tesfaye',
      category: 'Development'
    },
    {
      id: 5,
      name: 'Backend Development',
      startDate: '2024-03-05',
      endDate: '2024-04-20',
      progress: 30,
      dependencies: [2],
      assignee: 'Samuel Girma',
      category: 'Development'
    },
    {
      id: 6,
      name: 'Integration & Testing',
      startDate: '2024-04-10',
      endDate: '2024-05-05',
      progress: 0,
      dependencies: [4, 5],
      assignee: 'QA Team',
      category: 'Testing'
    },
    {
      id: 7,
      name: 'Deployment & Launch',
      startDate: '2024-05-01',
      endDate: '2024-05-15',
      progress: 0,
      dependencies: [6],
      assignee: 'DevOps Team',
      category: 'Deployment'
    }
  ]);

  const [viewMode, setViewMode] = useState<'days' | 'weeks' | 'months'>('weeks');
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);
  const [currentDate] = useState(new Date());

  // Calculate project timeline
  const getProjectStart = () => {
    const startDates = tasks.map(task => new Date(task.startDate));
    return new Date(Math.min(...startDates.map(date => date.getTime())));
  };

  const getProjectEnd = () => {
    const endDates = tasks.map(task => new Date(task.endDate));
    return new Date(Math.max(...endDates.map(date => date.getTime())));
  };

  const generateTimelineHeaders = () => {
    const start = getProjectStart();
    const end = getProjectEnd();
    const headers = [];
    
    if (viewMode === 'weeks') {
      let current = new Date(start);
      while (current <= end) {
        headers.push({
          label: `Week ${Math.ceil((current.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1}`,
          date: new Date(current)
        });
        current.setDate(current.getDate() + 7);
      }
    } else if (viewMode === 'months') {
      let current = new Date(start.getFullYear(), start.getMonth(), 1);
      while (current <= end) {
        headers.push({
          label: current.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          date: new Date(current)
        });
        current.setMonth(current.getMonth() + 1);
      }
    }
    
    return headers;
  };

  const calculateTaskPosition = (task: GanttTask) => {
    const projectStart = getProjectStart();
    const projectEnd = getProjectEnd();
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    
    const totalDuration = projectEnd.getTime() - projectStart.getTime();
    const taskStartOffset = taskStart.getTime() - projectStart.getTime();
    const taskDuration = taskEnd.getTime() - taskStart.getTime();
    
    const left = (taskStartOffset / totalDuration) * 100;
    const width = (taskDuration / totalDuration) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Planning': 'bg-blue-500',
      'Analysis': 'bg-purple-500',
      'Design': 'bg-pink-500',
      'Development': 'bg-green-500',
      'Testing': 'bg-orange-500',
      'Deployment': 'bg-red-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const isTaskOverdue = (task: GanttTask) => {
    const taskEnd = new Date(task.endDate);
    return currentDate > taskEnd && task.progress < 100;
  };

  const isDependencyMet = (task: GanttTask) => {
    if (!task.dependencies) return true;
    return task.dependencies.every(depId => {
      const depTask = tasks.find(t => t.id === depId);
      return depTask && depTask.progress === 100;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Project Timeline</h3>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['days', 'weeks', 'months'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 rounded-md text-sm transition-colors cursor-pointer ${
                  viewMode === mode
                    ? 'bg-[#1F3D3A] text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-[#1F3D3A] text-white rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
            <i className="ri-add-line mr-2"></i>
            Add Task
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Timeline Header */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-4 font-semibold text-gray-700 border-b pb-2">
              Task Name
            </div>
            <div className="col-span-8 border-b pb-2">
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${generateTimelineHeaders().length}, 1fr)` }}>
                {generateTimelineHeaders().map((header, index) => (
                  <div key={index} className="text-center text-sm font-medium text-gray-600">
                    {header.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="space-y-3">
            {tasks.map((task) => {
              const position = calculateTaskPosition(task);
              const isOverdue = isTaskOverdue(task);
              const depsMet = isDependencyMet(task);

              return (
                <div key={task.id} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-gray-50 rounded-lg">
                  <div className="col-span-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getCategoryColor(task.category)}`}></div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{task.name}</div>
                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                          <span>{task.assignee}</span>
                          {!depsMet && (
                            <span className="text-yellow-600">
                              <i className="ri-alert-line"></i>
                            </span>
                          )}
                          {isOverdue && (
                            <span className="text-red-600">
                              <i className="ri-time-line"></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-8 relative h-8">
                    <div className="absolute inset-y-0 w-full bg-gray-100 rounded"></div>
                    <div
                      className={`absolute inset-y-0 rounded flex items-center ${getCategoryColor(task.category)} ${
                        isOverdue ? 'opacity-75 border-2 border-red-400' : ''
                      }`}
                      style={position}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="w-full h-full rounded relative overflow-hidden cursor-pointer">
                        <div 
                          className="h-full bg-white/30 transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                          {task.progress}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-sm font-medium text-gray-700">Categories:</div>
            {['Planning', 'Analysis', 'Design', 'Development', 'Testing', 'Deployment'].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
                <span className="text-sm text-gray-600">{category}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <i className="ri-alert-line text-yellow-600"></i>
              <span>Waiting for dependencies</span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="ri-time-line text-red-600"></i>
              <span>Overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">Task Details</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">{selectedTask.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Category: {selectedTask.category}</span>
                    <span>•</span>
                    <span>Assignee: {selectedTask.assignee}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="text-gray-800">{selectedTask.startDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="text-gray-800">{selectedTask.endDate}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Progress</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getCategoryColor(selectedTask.category)}`}
                        style={{ width: `${selectedTask.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">{selectedTask.progress}%</span>
                  </div>
                </div>

                {selectedTask.dependencies && selectedTask.dependencies.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dependencies</label>
                    <div className="space-y-1">
                      {selectedTask.dependencies.map((depId) => {
                        const depTask = tasks.find(t => t.id === depId);
                        return depTask ? (
                          <div key={depId} className="text-sm text-gray-600 flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${depTask.progress === 100 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span>{depTask.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-[#1F3D3A] text-white py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Edit Task
                  </button>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}