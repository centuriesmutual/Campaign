'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  PencilSquareIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, shortName: 'Home' },
  { name: 'Create Ad', href: '/dashboard/create-ad', icon: PencilSquareIcon, shortName: 'Create' },
  { name: 'Performance', href: '/dashboard/performance', icon: ChartBarIcon, shortName: 'Stats' },
  { name: 'Submit Content', href: '/dashboard/submit-content', icon: DocumentTextIcon, shortName: 'Submit' },
  { name: 'Chat & Meetings', href: '/dashboard/chat-meetings', icon: ChatBubbleLeftRightIcon, shortName: 'Chat' },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, shortName: 'Settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 py-4">Marketing Hub</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex justify-between sm:justify-start sm:space-x-6" aria-label="Tabs">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group inline-flex items-center px-1 sm:px-2 py-2 sm:py-4 text-xs sm:text-sm font-medium border-b-2 
                    ${isActive
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 sm:mr-2" />
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">{item.shortName}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 