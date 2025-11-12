import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { FaCog, FaFilePdf, FaHome } from "react-icons/fa";

// No 'collapsed' prop needed here anymore
const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { key: "/", icon: <FaHome />, label: "Dashboard" },
        { key: "/pdf", icon: <FaFilePdf />, label: "Generate Report" },
        { key: "/settings", icon: <FaCog />, label: "Settings" },
    ];

    return (
        // The top logo/app name div has been removed.
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className="mt-4 border-none"
            items={menuItems.map((item) => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => navigate(item.key),
            }))}
        />
    );
}

export default Sidebar;