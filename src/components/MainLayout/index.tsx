import React, { useState } from 'react';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { DesktopNavbar } from './DesktopNavbar';
import { ProfileDropdown } from './ProfileDropdown';
import { MobileNavbar } from './MobileNavbar';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function MainLayout({ children, title = 'Dashboard' }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DesktopNavbar />
      <div className="flex min-h-full flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-100 shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="ml-auto flex items-center px-4">
            <ProfileDropdown />
          </div>
        </div>

        <main className="min-h-full flex-grow bg-white">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
