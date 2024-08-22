// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPages from './pages/demo-page/1login';
// import RegistrationPage from './pages/demo-page/1register.tsx';
// import HomePage from './pages/demo-page/1home.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import MainComponent from './pages/MainComponent.tsx';
import NotFoundPage from './pages/NotFoundPage';

import LogoutPage from './pages/LogoutPage'; 

import ProtectedRoute from './components/ProtectedRoute'; // Adjust the import path

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/home" element={<MainComponent />} /> */}
          <Route path="/home" element={<ProtectedRoute element={<MainComponent />} />} />

          <Route path="*" element={<NotFoundPage />} />

          <Route path="/logout" element={<LogoutPage />} /> 

          {/* <Route path="/home2" element={<HomePage />} />
          <Route path="/login2" element={<LoginPages />} />
          <Route path="/register2" element={<RegistrationPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
