import React, { useState } from 'react';
import { Layout, theme } from "antd";
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const { Content, Sider, Header } = Layout;

const DashboardLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="min-h-screen">
            {/* 1. This Header is now at the top and full-width */}
            <Header
                style={{
                    padding: '0 16px',
                    background: colorBgContainer,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', // Pushes user info to the right
                }}
                className="shadow"
            >
                {/* Navbar component provides the content FOR the Header */}
                <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </Header>

            {/* 2. This inner Layout sits *below* the Header */}
            <Layout>
                {/* 3. The Sider is inside the inner Layout */}
                <Sider
                    width={220}
                    collapsible
                    collapsed={collapsed}
                    trigger={null} // The button in the Header controls it
                    style={{ background: colorBgContainer }}
                    className="border-r border-gray-200"
                >
                    <Sidebar />
                </Sider>

                {/* 4. The Content is also inside the inner Layout, next to Sider */}
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