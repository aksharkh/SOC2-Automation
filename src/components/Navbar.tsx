import React from 'react';
import { Button } from "antd";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => {
    return (
        
        <>
            <div className="flex items-center space-x-3">
                <Button
                    type="text"
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-xl"
                    icon={collapsed ? <FaBars /> : <FaTimes />}
                />
                <h1 className="text-lg font-semibold text-gray-800">
                    Reach ISO - SOC 2 Type Generator
                </h1>
            </div>

           
            <div className="text-gray-600 text-sm font-medium">
                Hello, akshar
            </div>
        </>
    );
}

export default Navbar;