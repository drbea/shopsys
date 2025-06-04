import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import SubNavbar from './SubNavBar';

export default function  DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
      {/* <div className=""> */}
        {/* Top bar */}
        <TopBar />

        {/* Sub nav */}
        <SubNavbar />

        {/* Page content */}
        <main className="p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
