import React, { useState } from 'react';
import { Layout, theme } from "antd";
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const { Content, Sider, Header } = Layout;

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="min-h-screen">
            
            <Header
                style={{
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', 
                }}
                className="shadow"
            >
                
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Header>

            
            <Layout>
                
                <Sider
                    width={220}
                    collapsible
                    collapsed={collapsed}
                    trigger={null}
                    style={{ background: colorBgContainer }}
                    className="border-r border-gray-200"
                >
                    <Sidebar />
                </Sider>

                <Layout>
                    <Content className="p-6 bg-gray-50">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default DashboardLayout;