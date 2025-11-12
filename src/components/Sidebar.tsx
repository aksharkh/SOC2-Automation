import React from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from "react-router-dom";
import { FaCog, FaFilePdf, FaHome } from "react-icons/fa";


const { Sider} = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({collapsed}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key:"/", icon: <FaHome />, label: "Dashboard"},
    { key:"/pdf", icon: <FaFilePdf />, label: "Generate Report"},
    { key:"/settings", icon: <FaCog />, label: "Settings"},
  ]


  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        background: "white",
      }}
      className="border-r border-gray-200 fixed h-full left-0 top-0z-20"
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <span className="text-blue-600 font-bold text-lg">
          {collapsed}

        </span>

      </div>

      <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      className="mt-4"
      items={menuItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => navigate(item.key),
      }))}
      />

      

    </Sider>
  )
}

export default Sidebar