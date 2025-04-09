import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Home/Header';
import SideBar from '../components/Home/SideBar';

const Home = () => {
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  // Check if we are on a specific document page (like /todo/:id)
  const isViewingDocument = location.pathname.startsWith('/todo/');

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      {/* Header */}
      <Header />

      {/* Main layout */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Sidebar (List view) */}
        <div
          className={`
            ${isMobile ? (isViewingDocument ? 'hidden' : 'block') : 'block'}
            w-full md:w-1/4 h-screen
          `}
        >
          <SideBar />
        </div>

        {/* Main content (Document view) */}
        <div
          className={`
            ${isMobile ? (isViewingDocument ? 'block' : 'hidden') : 'block'}
            flex-1 h-full overflow-y-auto bg-[#f7f7f7] rounded-xl
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
