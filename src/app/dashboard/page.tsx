'use client';

import {
  SparklesIcon,
  ChartBarIcon,
  PhotoIcon,
  VideoCameraIcon,
  PencilSquareIcon,
  CommandLineIcon,
  ScissorsIcon,
  FilmIcon,
  CloudArrowUpIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  UserGroupIcon,
  DocumentIcon,
  PlayIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import TaskModal from './components/TaskModal';
import Calendar from './components/Calendar';
import TaskListModal from './components/TaskListModal';

export default function DashboardPage() {
  const [isDropboxConnected, setIsDropboxConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [isTaskListModalOpen, setIsTaskListModalOpen] = useState(false);

  const handleDropboxLogin = () => {
    // Add Dropbox OAuth logic here
    console.log('Connecting to Dropbox...');
    setIsDropboxConnected(true);
  };

  const aiResources = [
    {
      name: 'Copy Writing',
      description: 'Generate marketing copy and content',
      icon: PencilSquareIcon,
      links: [
        { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'AI writing assistant' },
        { name: 'Copy.ai', url: 'https://www.copy.ai', description: 'Marketing copy generator' },
      ]
    },
    {
      name: 'Image Creation',
      description: 'Create and edit marketing visuals',
      icon: PhotoIcon,
      links: [
        { name: 'DALL-E', url: 'https://labs.openai.com', description: 'AI image generation' },
        { name: 'Midjourney', url: 'https://www.midjourney.com', description: 'Advanced AI artwork' },
        { name: 'Canva', url: 'https://www.canva.com', description: 'Design and editing' },
      ]
    },
    {
      name: 'Video Creation',
      description: 'Create marketing videos',
      icon: VideoCameraIcon,
      links: [
        { name: 'Synthesia', url: 'https://www.synthesia.io', description: 'AI video generation' },
        { name: 'Descript', url: 'https://www.descript.com', description: 'Video editing with AI' },
      ]
    },
    {
      name: 'AI Tools',
      description: 'Other useful AI tools',
      icon: CommandLineIcon,
      links: [
        { name: 'RunwayML', url: 'https://runwayml.com', description: 'Advanced AI creative suite' },
        { name: 'Beautiful.ai', url: 'https://www.beautiful.ai', description: 'AI presentation maker' },
      ]
    }
  ];

  const upcomingEvents: Array<{
    id: number;
    title: string;
    time: string;
    date: string;
    type: 'meeting' | 'review' | 'event';
  }> = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '2:00 PM',
      date: 'Today',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Content Review',
      time: '11:00 AM',
      date: 'Tomorrow',
      type: 'review',
    },
    {
      id: 3,
      title: 'Campaign Launch',
      time: '9:00 AM',
      date: 'Apr 15',
      type: 'event',
    },
  ];

  const recentActivity = upcomingEvents.map(event => ({
    id: event.id,
    title: event.title,
    description: `${event.date} • ${event.time}`,
    icon: CalendarIcon,
    timestamp: event.date === 'Today' ? 'Today' : event.date === 'Tomorrow' ? 'Tomorrow' : event.date,
    type: event.type
  }));

  const editingResources = [
    {
      name: 'Photo Editing',
      description: 'Professional photo editing tools',
      icon: ScissorsIcon,
      links: [
        { name: 'Adobe Photoshop', url: 'https://www.adobe.com/products/photoshop.html', description: 'Professional photo editing' },
        { name: 'Figma', url: 'https://www.figma.com', description: 'Design and layout' },
        { name: 'Pixlr', url: 'https://pixlr.com', description: 'Free online photo editor' },
      ]
    },
    {
      name: 'Video Editing',
      description: 'Video editing and production tools',
      icon: FilmIcon,
      links: [
        { name: 'CapCut', url: 'https://www.capcut.com', description: 'Easy-to-use video editor' },
        { name: 'Adobe Premiere Pro', url: 'https://www.adobe.com/products/premiere.html', description: 'Professional video editing' },
        { name: 'DaVinci Resolve', url: 'https://www.blackmagicdesign.com/products/davinciresolve', description: 'Free professional video editor' },
      ]
    },
    {
      name: 'Social Media',
      description: 'Social media content creation tools',
      icon: PhotoIcon,
      links: [
        { name: 'Canva', url: 'https://www.canva.com', description: 'Social media templates' },
        { name: 'Adobe Express', url: 'https://www.adobe.com/express', description: 'Quick social media content' },
        { name: 'Picsart', url: 'https://picsart.com', description: 'Photo and video editing for social' },
      ]
    },
    {
      name: 'Motion Graphics',
      description: 'Animation and motion graphics tools',
      icon: VideoCameraIcon,
      links: [
        { name: 'After Effects', url: 'https://www.adobe.com/products/aftereffects.html', description: 'Professional motion graphics' },
        { name: 'Motion', url: 'https://www.apple.com/final-cut-pro/motion/', description: 'Apple motion graphics' },
        { name: 'Blender', url: 'https://www.blender.org', description: 'Free 3D and animation' },
      ]
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Review Q2 Marketing Plan',
      description: 'Review and provide feedback on the Q2 marketing strategy and budget allocation.',
      dueDate: 'Today',
      priority: 'High',
      status: 'In Progress',
      assignedBy: 'Sarah Johnson',
      assignedDate: '2024-03-15',
      comments: [
        {
          id: 1,
          author: 'Sarah Johnson',
          text: 'Please focus on the digital marketing aspects.',
          timestamp: '2 days ago'
        }
      ]
    },
    {
      id: 2,
      title: 'Create Social Media Posts',
      description: 'Design and schedule social media content for the upcoming product launch.',
      dueDate: 'Tomorrow',
      priority: 'Medium',
      status: 'Not Started',
      assignedBy: 'Mike Chen',
      assignedDate: '2024-03-16'
    },
    {
      id: 3,
      title: 'Update Website Content',
      description: 'Refresh the website content with new product information and customer testimonials.',
      dueDate: 'Next Week',
      priority: 'Low',
      status: 'In Progress',
      assignedBy: 'Lisa Wong',
      assignedDate: '2024-03-14'
    }
  ];

  const recentUploads = [
    {
      id: 1,
      name: 'Summer_Sale_Video_Ad.mp4',
      type: 'video',
      size: '24.5 MB',
      uploadedAt: 'Today at 2:30 PM',
      icon: PlayIcon,
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      hoverBg: 'group-hover:bg-purple-100',
      hoverColor: 'group-hover:text-purple-600',
    },
    {
      id: 2,
      name: 'Product_Launch_Banner.png',
      type: 'image',
      size: '3.2 MB',
      uploadedAt: 'Today at 1:15 PM',
      icon: PhotoIcon,
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-50',
      hoverBg: 'group-hover:bg-pink-100',
      hoverColor: 'group-hover:text-pink-600',
    },
    {
      id: 3,
      name: 'Holiday_Campaign_Brief.pdf',
      type: 'document',
      size: '1.8 MB',
      uploadedAt: 'Yesterday at 4:45 PM',
      icon: DocumentIcon,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      hoverBg: 'group-hover:bg-red-100',
      hoverColor: 'group-hover:text-red-600',
    },
    {
      id: 4,
      name: 'Q4_Marketing_Calendar.xlsx',
      type: 'spreadsheet',
      size: '856 KB',
      uploadedAt: 'Yesterday at 3:20 PM',
      icon: CalendarIcon,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverBg: 'group-hover:bg-green-100',
      hoverColor: 'group-hover:text-green-600',
    },
  ];

  const handleTaskClick = (task: typeof tasks[0]) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleUpdateTaskStatus = (newStatus: string) => {
    if (selectedTask) {
      // Update task status logic here
      console.log(`Updating task ${selectedTask.id} status to ${newStatus}`);
    }
  };

  const handleSubmitNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add new task logic here
    console.log('Submitting new task:', newTaskTitle);
    setTimeout(() => {
      setIsSubmitting(false);
      setNewTaskTitle('');
    }, 1000);
  };

  const handleEventClick = (event: typeof upcomingEvents[0]) => {
    setSelectedEvent(event);
    // You can add more functionality here, like opening a modal
    console.log('Event clicked:', event);
  };

  const handleViewAllTasks = () => {
    setIsTaskListModalOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Tasks and Calendar Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar - Will be first on mobile */}
              <div className="order-first lg:order-last">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <Calendar events={upcomingEvents} onEventClick={handleEventClick} />
                </div>
              </div>

              {/* Tasks Section */}
              <div className="order-last lg:order-first">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
                    <button
                      onClick={handleViewAllTasks}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      View All
                    </button>
                  </div>
                  {/* Task list content */}
                  <div className="space-y-4">
                    {tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={task.status === 'Completed'}
                            onChange={(e) => e.stopPropagation()}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <p className="text-xs text-gray-500">
                              Due: {task.dueDate} • {task.priority} Priority
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dropbox Integration and Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dropbox Integration */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="flex items-center space-x-3">
                    <CloudArrowUpIcon className="h-8 w-8 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Dropbox Integration</h2>
                  </div>
                  <p className="text-sm text-gray-500 text-center">Connect to export performance data</p>
                  {!isDropboxConnected ? (
                    <button
                      onClick={handleDropboxLogin}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Connect Dropbox
                    </button>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-sm text-green-600 font-medium">Connected</span>
                      <button
                        onClick={() => setIsDropboxConnected(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const isToday = event.date === 'Today';
                    return (
                      <div
                        key={event.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                          isToday 
                            ? 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className={`p-2 rounded-lg ${
                          event.type === 'meeting' 
                            ? isToday ? 'bg-purple-200' : 'bg-purple-100'
                            : event.type === 'review' 
                            ? isToday ? 'bg-blue-200' : 'bg-blue-100'
                            : isToday ? 'bg-green-200' : 'bg-green-100'
                        }`}>
                          <CalendarIcon className={`h-5 w-5 ${
                            event.type === 'meeting' 
                              ? isToday ? 'text-purple-700' : 'text-purple-600'
                              : event.type === 'review' 
                              ? isToday ? 'text-blue-700' : 'text-blue-600'
                              : isToday ? 'text-green-700' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            isToday ? 'text-indigo-900' : 'text-gray-900'
                          }`}>
                            {event.title}
                            {isToday && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                Today
                              </span>
                            )}
                          </p>
                          <p className={`text-xs ${
                            isToday ? 'text-indigo-600 font-medium' : 'text-gray-500'
                          }`}>
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recently Uploaded Ads */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recently Uploaded Ads</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <CloudArrowUpIcon className="h-5 w-5 mr-1" />
                  <span>Synced with Dropbox</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentUploads.map((file) => (
                  <div
                    key={file.id}
                    className="group relative flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className={`w-full aspect-square flex items-center justify-center ${file.bgColor} rounded-lg mb-3 ${file.hoverBg} transition-colors`}>
                      <file.icon className={`h-12 w-12 ${file.iconColor} ${file.hoverColor} transition-colors`} />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                      <p className="text-xs text-gray-400">{file.uploadedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'ai-resources':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              AI Resources for Content Creation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiResources.map((resource) => (
                <div key={resource.name} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <resource.icon className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-md font-medium text-gray-900">{resource.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                  <div className="space-y-2">
                    {resource.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {link.name}
                        <p className="text-xs text-gray-500">{link.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'editing-resources':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Content Editing Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editingResources.map((resource) => (
                <div key={resource.name} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <resource.icon className="h-6 w-6 text-indigo-600" />
                    <h3 className="text-md font-medium text-gray-900">{resource.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                  <div className="space-y-2">
                    {resource.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {link.name}
                        <p className="text-xs text-gray-500">{link.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ai-resources')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'ai-resources'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            AI Resources
          </button>
          <button
            onClick={() => setActiveTab('editing-resources')}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'editing-resources'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Editing Resources
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          onUpdateStatus={handleUpdateTaskStatus}
        />
      )}
    </div>
  );
} 