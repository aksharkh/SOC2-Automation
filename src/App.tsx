import React from 'react'
import DashboardLayout from './pages/DashboardLayout'
import PdfForm from './pages/PdfForm'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Settings from "./pages/Settings"

const App: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<DashboardLayout />} >
          <Route index element={<Dashboard />} />
          <Route path="pdf" element={<PdfForm />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />

        </Route>
        
      </Routes>
    
  )
}

export default App