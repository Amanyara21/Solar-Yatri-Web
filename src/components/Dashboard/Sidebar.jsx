import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname); 
    const menuItems = [
        { name: "Dashboard", path: "/admin/" },
        { name: "Listing", path: "/admin/listing" },
    ];

    return (
        <div>
            <div id="drawer-navigation" className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
                <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
                <div className="py-4">
                    <ul className="space-y-2 font-medium">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link 
                                    to={item.path} 
                                    onClick={() => setActiveTab(item.path)}
                                    className={`flex items-center p-2 rounded-lg group ${
                                        activeTab === item.path
                                            ? "bg-blue-500 text-white dark:bg-blue-700"
                                            : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <span className="ms-3">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
