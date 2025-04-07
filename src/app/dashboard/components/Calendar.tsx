'use client';

import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import EventModal from './EventModal';
import Clock from './Clock';

interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  type: 'meeting' | 'review' | 'event';
}

interface CalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const getDayEvents = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventDate = new Date(event.date === 'Today' 
        ? new Date() 
        : event.date === 'Tomorrow'
        ? new Date().setDate(new Date().getDate() + 1)
        : event.date);
      return eventDate.toDateString() === new Date(dateStr).toDateString();
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear() &&
      day === today.getDate();
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </button>
          <h2 className="text-sm font-semibold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <Clock />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px mb-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-16 bg-white p-1" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getDayEvents(day);
          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`h-16 p-1 bg-white hover:bg-gray-50 cursor-pointer ${
                isToday(day) ? 'bg-blue-50' : ''
              }`}
            >
              <div className="text-right">
                <span className={`text-xs ${isToday(day) ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                  {day}
                </span>
              </div>
              <div className="mt-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`text-xs px-1 mb-0.5 rounded truncate ${
                      event.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
                      event.type === 'review' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 pl-1">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Modal */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedDate.toDateString()}
              </h3>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedDate(null)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 