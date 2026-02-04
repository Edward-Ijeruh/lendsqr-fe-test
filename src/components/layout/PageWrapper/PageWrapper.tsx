import { useState } from "react";
import "./PageWrapper.scss";
import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="page-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <div className="page-wrapper__main">
        <Topbar onMenuClick={toggleSidebar} isMenuOpen={isSidebarOpen} />
        <div className="page-wrapper__content">{children}</div>
      </div>
    </div>
  );
}
