import React, { useState } from 'react'
import { Layout } from "antd";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';


const {Content} = Layout;



const DashboardLayout: React.FC = () => {

  
const [collapsed, setCollapsed] = useState<boolean>(false);




  return (
    <Layout className="min-h-screen">
        <Sidebar collapsed={collapsed}/>
        <Layout className="bg-gray-100">
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <Content className="p-6">
              
              <Outlet />

            </Content>
        </Layout>
    </Layout>
  )
}

export default DashboardLayout