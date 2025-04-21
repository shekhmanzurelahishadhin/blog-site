// resources/js/components/Layouts/AdminLayout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FiMenu, FiX, FiChevronDown, FiChevronRight, FiArrowRight,
  FiHome, FiUsers, FiSettings, FiPieChart, FiShoppingBag,
  FiFileText, FiMail, FiLock, FiLogOut, FiUser, FiKey, FiHelpCircle, FiPackage
} from 'react-icons/fi';
import '../styles/custome.css';
import useAuth from '../../auth/useAuth';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on mobile when route changes
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

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome className="text-lg" />,
      path: '/admin/dashboard'
    },
    {
      name: 'Categories',
      icon: <FiPackage className="text-lg" />,
      path: '/admin/categories'
    },
    {
      name: 'Users',
      icon: <FiUsers className="text-lg" />,
      path: '/admin/users'
    },
    {
      name: 'Products',
      icon: <FiShoppingBag className="text-lg" />,
      submenus: [
        { name: 'All Products', path: '/admin/products' },
        { name: 'Categories', path: '/admin/products/categories' },
        {
          name: 'Inventory',
          submenus: [
            {
              name: 'Stock Levels',
              path: '/admin/products/inventory/stock'
            },
            {
              name: 'Warehouses',
              path: '/admin/products/inventory/warehouses'
            },
            {
              name: 'Transfers',
              path: '/admin/products/inventory/transfers'
            }
          ]
        }
      ]
    },
    {
      name: 'Orders',
      icon: <FiFileText className="text-lg" />,
      path: '/admin/orders'
    },
    {
      name: 'Reports',
      icon: <FiPieChart className="text-lg" />,
      submenus: [
        { name: 'Sales', path: '/admin/reports/sales' },
        { name: 'Customers', path: '/admin/reports/customers' },
        { name: 'Products', path: '/admin/reports/products' }
      ]
    },
    {
      name: 'Settings',
      icon: <FiSettings className="text-lg" />,
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
            aria-label="Close sidebar"
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
                          {submenu.submenus ? (
                            <>
                              <div
                                className={`submenu-toggle ${isParentActive(submenu) ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubmenu(`${item.name}-${submenu.name}`);
                                }}
                              >
                                <span className="submenu-text">{submenu.name}</span>
                                <span className={`submenu-arrow ${openSubmenus[`${item.name}-${submenu.name}`] ? 'open' : ''}`}>
                                  <FiChevronRight size={14} />
                                </span>
                              </div>
                              <ul className={`nested-submenu ${openSubmenus[`${item.name}-${submenu.name}`] ? 'open' : ''}`}>
                                {submenu.submenus.map((nestedSubmenu) => (
                                  <li key={nestedSubmenu.name} className="nested-submenu-item">
                                    <Link
                                      to={nestedSubmenu.path}
                                      className={`nested-submenu-link ${isActive(nestedSubmenu.path) ? 'active' : ''}`}
                                    >
                                      {nestedSubmenu.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              to={submenu.path}
                              className={`submenu-link ${isActive(submenu.path) ? 'active' : ''}`}
                            >
                              {submenu.name}
                            </Link>
                          )}
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
          <Link onClick={handleLogout} className="menu-link">
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
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiMenu size={20} /> : <FiArrowRight size={20} />}
          </button>

          <div className="user-menu" ref={dropdownRef}>
            <button className="relative">
              <FiMail size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              {/* User Dropdown Trigger */}
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors"
                onClick={toggleUserDropdown}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
              >
                <div className="user-avatar flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:flex items-center gap-1">
                  <span className="font-medium text-gray-700">{user?.name || 'Admin User'}</span>
                  <FiChevronDown className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@example.com'}</p>
                  </div>

                  <Link
                    to="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser className="mr-3 text-gray-400" />
                    Your Profile
                  </Link>

                  <Link
                    to="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiSettings className="mr-3 text-gray-400" />
                    Settings
                  </Link>

                  <Link
                    to="/admin/password"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiKey className="mr-3 text-gray-400" />
                    Change Password
                  </Link>

                  <div className="border-t border-gray-100"></div>

                  <Link
                    to="/admin/help"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiHelpCircle className="mr-3 text-gray-400" />
                    Help Center
                  </Link>

                  <div className="border-t border-gray-100"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    <FiLogOut className="mr-3 text-gray-400" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* <div className="max-w-7xl mx-auto"> */}
          <Outlet />
          {/* </div> */}
        </main>
      </div>
    </div>
  );
}
