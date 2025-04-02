// resources/js/components/Layouts/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { 
  FiHome, FiUsers, FiSettings, FiPieChart, 
  FiShoppingBag, FiFileText, FiMail, FiLock, FiLogOut
} from 'react-icons/fi';
import '../styles/custome.css';



export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome />,
      path: '/admin/dashboard'
    },
    {
      name: 'Users',
      icon: <FiUsers />,
      path: '/admin/users'
    },
    {
      name: 'Products',
      icon: <FiShoppingBag />,
      submenus: [
        { name: 'All Products', path: '/admin/products' },
        { name: 'Categories', path: '/admin/products/categories' },
        { name: 'Inventory', path: '/admin/products/inventory' }
      ]
    },
    {
      name: 'Orders',
      icon: <FiFileText />,
      path: '/admin/orders'
    },
    {
      name: 'Reports',
      icon: <FiPieChart />,
      submenus: [
        { name: 'Sales', path: '/admin/reports/sales' },
        { name: 'Customers', path: '/admin/reports/customers' },
        { name: 'Products', path: '/admin/reports/products' }
      ]
    },
    {
      name: 'Settings',
      icon: <FiSettings />,
      submenus: [
        { name: 'General', path: '/admin/settings/general' },
        { name: 'Security', path: '/admin/settings/security' },
        { name: 'Notifications', path: '/admin/settings/notifications' }
      ]
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (item.path) {
      return location.pathname.startsWith(item.path);
    }
    if (item.submenus) {
      return item.submenus.some(submenu => 
        location.pathname.startsWith(submenu.path)
      );
    }
    return false;
  };

  return (
    <>
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-header">
            <Link to="/admin" className="sidebar-logo">
              AdminPro
            </Link>
            <button 
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="sidebar-content">
            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li key={item.name} className="menu-item">
                  {item.submenus ? (
                    <>
                      <div 
                        className={`menu-toggle ${isParentActive(item) ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(item.name)}
                      >
                        <span className="menu-icon">{item.icon}</span>
                        <span className="menu-text">{item.name}</span>
                        <span className={`menu-arrow ${openSubmenus[item.name] ? 'open' : ''}`}>
                          <FiChevronRight />
                        </span>
                      </div>
                      <ul className={`submenu ${openSubmenus[item.name] ? 'open' : ''}`}>
                        {item.submenus.map((submenu) => (
                          <li key={submenu.name} className="submenu-item">
                            <Link
                              to={submenu.path}
                              className={`submenu-link ${isActive(submenu.path) ? 'active' : ''}`}
                            >
                              {submenu.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`menu-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-footer">
            <Link to="/logout" className="menu-link">
              <span className="menu-icon">
                <FiLogOut />
              </span>
              <span className="menu-text">Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
          {/* Topbar */}
          <header className="topbar">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu />
            </button>
            <div className="user-menu">
              <button className="relative">
                <FiMail size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="user-avatar">AD</div>
                <span className="hidden md:inline">Admin User</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}