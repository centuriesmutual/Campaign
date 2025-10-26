'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ClockIcon,
  DocumentTextIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  FireIcon,
  StarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

export default function HistoryPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('views');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('views');
  const [sortOrder, setSortOrder] = useState('desc');
  const [articlesPerPage, setArticlesPerPage] = useState(5);

  // Sample article data for BI dashboard
  const articleData = [
    { id: 1, title: 'Marketing Strategy Guide', views: 15420, engagement: 94, publishDate: '2024-01-21', status: 'Published', category: 'Strategy' },
    { id: 2, title: 'Q4 Campaign Brief', views: 12850, engagement: 87, publishDate: '2024-01-20', status: 'Updated', category: 'Campaign' },
    { id: 3, title: 'Social Media Best Practices', views: 9650, engagement: 91, publishDate: '2024-01-19', status: 'Published', category: 'Social Media' },
    { id: 4, title: 'Content Calendar Template', views: 11200, engagement: 89, publishDate: '2024-01-18', status: 'Draft', category: 'Templates' },
    { id: 5, title: 'Email Marketing Automation', views: 8750, engagement: 88, publishDate: '2024-01-17', status: 'Published', category: 'Email' },
    { id: 6, title: 'SEO Optimization Tips', views: 14200, engagement: 92, publishDate: '2024-01-16', status: 'Published', category: 'SEO' },
    { id: 7, title: 'Brand Guidelines Update', views: 6800, engagement: 85, publishDate: '2024-01-15', status: 'Updated', category: 'Brand' },
    { id: 8, title: 'Analytics Dashboard Setup', views: 9200, engagement: 90, publishDate: '2024-01-14', status: 'Published', category: 'Analytics' },
    { id: 9, title: 'Video Content Strategy', views: 10500, engagement: 87, publishDate: '2024-01-13', status: 'Published', category: 'Video' },
    { id: 10, title: 'Customer Journey Mapping', views: 7800, engagement: 89, publishDate: '2024-01-12', status: 'Draft', category: 'Strategy' },
  ];

  const recentActivity = [
    { action: 'Article Published', content: 'Marketing Strategy Guide', time: '2 hours ago', type: 'publish', impact: 'high' },
    { action: 'Content Updated', content: 'Q4 Campaign Brief', time: 'Yesterday', type: 'update', impact: 'medium' },
    { action: 'Task Completed', content: 'Review Q2 Marketing Plan', time: '3 days ago', type: 'task', impact: 'high' },
    { action: 'Analytics Generated', content: 'Weekly Performance Report', time: '1 week ago', type: 'analytics', impact: 'medium' },
  ];

  // Sorting logic
  const sortedArticles = [...articleData].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'views':
        aValue = a.views;
        bValue = b.views;
        break;
      case 'engagement':
        aValue = a.engagement;
        bValue = b.engagement;
        break;
      case 'date':
        aValue = new Date(a.publishDate).getTime();
        bValue = new Date(b.publishDate).getTime();
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      default:
        aValue = a.views;
        bValue = b.views;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Dynamic pagination logic
  const totalArticles = sortedArticles.length;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = Math.min(startIndex + articlesPerPage, totalArticles);
  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  // Dynamic page size options based on content
  const getPageSizeOptions = () => {
    const options = [5, 10, 20];
    if (totalArticles > 50) options.push(50);
    if (totalArticles > 100) options.push(100);
    return options;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (newSize: number) => {
    setArticlesPerPage(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      // If clicking the same field, toggle the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a different field, set it and default to desc
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const metrics = [
    { name: 'Total Views', value: '89,420', change: '+12.5%', trend: 'up', icon: EyeIcon },
    { name: 'Content Submissions', value: '87', change: '+8.2%', trend: 'up', icon: DocumentTextIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
          <div className="flex space-x-1">
            {['7d', '30d', '90d', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-2 py-1 text-xs ${
                  selectedTimeRange === range
                    ? 'text-indigo-600 border-b border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {range === '7d' ? '7d' : range === '30d' ? '30d' : range === '90d' ? '90d' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className="h-8 w-8 text-indigo-600" />
                <div className={`flex items-center ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ChevronUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">Publications</h3>
              <button 
                onClick={() => window.location.href = '/bi'}
                className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ChartBarIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center space-x-1">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-xs border-0 bg-transparent text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <option value="views">Views</option>
                <option value="engagement">Engagement</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {currentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{article.title}</p>
                    <p className="text-xs text-gray-500">{article.category} • {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{article.views.toLocaleString()} views</p>
                  <p className="text-xs text-gray-500">{article.engagement}% engagement</p>
                </div>
              </div>
            ))}
            
            {/* Dynamic Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{endIndex} of {totalArticles} articles
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Show:</span>
                  <select
                    value={articlesPerPage}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                  >
                    {getPageSizeOptions().map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-gray-500">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(Number(page))}
                        className={`px-3 py-1 text-sm rounded-md ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}