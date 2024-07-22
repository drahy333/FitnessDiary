import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, ProtectedRoute } from './components';
import { Dashboard, Stacked, Cardio, Line, Login, Register, Training, Food, IndexPage } from './pages';
import Sleep from "./pages/Sleep";
import './App.css';
import { useStateContext } from "./context/ContextProvider";
import LineCardio from "./pages/Charts/LineCardio";
import LineFood from "./pages/Charts/LineFood";
import LineSleep from "./pages/Charts/LineSleep";

const App = () => {
  const { currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, setIsLoggedIn, isLoggedIn } = useStateContext();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setAuthChecked(true);
  }, [setIsLoggedIn]);

  if (!authChecked) {
    return null;
  }

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {isLoggedIn && (
            <>
              <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent
                  content="Settings"
                  position="Top"
                >
                  <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  >
                    <FiSettings />
                  </button>
                </TooltipComponent>
              </div>
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}
            </>
          )}
          <div
            className={
              activeMenu && isLoggedIn
                ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
            }
          >
            {isLoggedIn && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            )}
            <div>
              {themeSettings && (<ThemeSettings />)}
              <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <IndexPage />} />
                <Route path="/*" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/training" element={
                  <ProtectedRoute>
                    <Training />
                  </ProtectedRoute>
                } />
                <Route path="/cardio" element={
                  <ProtectedRoute>
                    <Cardio />
                  </ProtectedRoute>
                } />
                <Route path="/performance-cardio" element={
                  <ProtectedRoute>
                    <LineCardio />
                  </ProtectedRoute>
                } />
                <Route path="/performance-food" element={
                  <ProtectedRoute>
                    <LineFood />
                  </ProtectedRoute>
                } />
                <Route path="/performance-sleep" element={
                  <ProtectedRoute>
                    <LineSleep />
                  </ProtectedRoute>
                } />
                <Route path="/performance-training" element={
                  <ProtectedRoute>
                    <Line />
                  </ProtectedRoute>
                } />
                <Route path="/food" element={
                  <ProtectedRoute>
                    <Food />
                  </ProtectedRoute>
                } />
                <Route path="/overview" element={
                  <ProtectedRoute>
                    <Stacked />
                  </ProtectedRoute>
                } />
                <Route path="/sleep" element={
                  <ProtectedRoute>
                    <Sleep />
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
