'use client';

import { useState } from 'react';
import {
  DocumentTextIcon,
  PhotoIcon,
  TagIcon,
  FolderIcon,
  CalendarDaysIcon,
  CloudArrowUpIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

export default function SubmitContentPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'blog',
    paperFileUrl: '',
    tags: '',
    featuredImage: null as File | null,
    publishDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement content submission logic
    console.log('Content submission data:', formData);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Submit Blog Post or Article</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'blog' })}
                className={`p-4 border rounded-lg flex items-center ${
                  formData.category === 'blog'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300'
                }`}
              >
                <DocumentTextIcon className="h-6 w-6 mr-2 text-indigo-600" />
                <div className="text-left">
                  <div className="font-medium">Blog Post</div>
                  <div className="text-sm text-gray-500">Informal, engaging content</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, category: 'news' })}
                className={`p-4 border rounded-lg flex items-center ${
                  formData.category === 'news'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300'
                }`}
              >
                <FolderIcon className="h-6 w-6 mr-2 text-indigo-600" />
                <div className="text-left">
                  <div className="font-medium">News Article</div>
                  <div className="text-sm text-gray-500">Formal, newsworthy content</div>
                </div>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Need help with titles? Try{' '}
              <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                ChatGPT
              </a>
            </p>
          </div>

          {/* Dropbox Paper File */}
          <div>
            <label htmlFor="paperFileUrl" className="block text-sm font-medium text-gray-700">
              Dropbox Paper Document
            </label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <a
                    href="https://paper.dropbox.com/doc/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create New Dropbox Paper Doc
                  </a>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Create and edit your {formData.category === 'blog' ? 'blog post' : 'news article'} in Dropbox Paper
                </p>
              </div>
              <div className="mt-4">
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                    <LinkIcon className="h-5 w-5" />
                  </span>
                  <input
                    type="url"
                    id="paperFileUrl"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Paste your Dropbox Paper document URL here"
                    value={formData.paperFileUrl}
                    onChange={(e) => setFormData({ ...formData, paperFileUrl: e.target.value })}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Share your document with edit access before submitting
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                <TagIcon className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="tags"
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter tags separated by commas"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData({ ...formData, featuredImage: file });
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Need images? Try AI generation with{' '}
              <a href="https://labs.openai.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                DALL-E
              </a>
              {' '}or{' '}
              <a href="https://www.midjourney.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                Midjourney
              </a>
            </p>
          </div>

          {/* Publish Date */}
          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">
              Publish Date
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                <CalendarDaysIcon className="h-5 w-5" />
              </span>
              <input
                type="datetime-local"
                id="publishDate"
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.publishDate}
                onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 