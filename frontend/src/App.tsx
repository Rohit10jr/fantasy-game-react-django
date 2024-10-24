// import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import LoginPage from './pages/demo-page/1login';
// import RegistrationPage from './pages/demo-page/1register.tsx';
// import HomePage from './pages/demo-page/1home.tsx';
// import RegisterPage from './pages/RegisterPage.tsx';
// import LoginPage from './pages/LoginPage.tsx';
// import MainComponent from './pages/MainComponent.tsx';

import NotFoundPage from './page/NotFoundPage';
import LogoutPage from './page/LogoutPage'; 
import ProtectedRoute from './component/ProtectedRoute.tsx'; 

// new component and page import

import SignupPage from './page/RegisterPage.tsx';
import LoginPages from './page/LoginPage.tsx';
import NewRound from './page/newRounds.tsx';
// import Elements from './page/Elements.tsx';
// import Design from './page/Elements.tsx';
import MyRound from './page/myRounds.tsx';
import PublicRoute from './component/PublicRoute.tsx';
import Landingpage from './page/Landingpage.tsx';
import Reset from './page/ResetPassword.tsx';
import Verify from './page/verifyotp.tsx';
import ForgotPage from './page/forgetpage.tsx';
import Otp from './page/sentotp.tsx';
import ForgotVerify from './page/verifyotp2.tsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          {/* <Route path="/login2" element={<LoginPage />} />
          <Route path="/register2" element={<RegisterPage />} /> */}
          {/* <Route path="/home2" element={<ProtectedRoute element={<MainComponent />} />} /> */}

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/logout" element={<LogoutPage />} /> 

          {/* new upadted pages route */}

          <Route path="/" element={<Landingpage />} />
          <Route path="/reset" element={< Reset/>} />
          <Route path="/verify" element={< Verify/>} />
          <Route path="/forgotverify" element={< ForgotVerify/>} />
          <Route path="/otp" element={< Otp/>} />
          <Route path="/forgot" element={< ForgotPage/>} />
          <Route path="/login" element={<PublicRoute element={<LoginPages />} />} />
          <Route path="/register" element={<PublicRoute element={<SignupPage />} />} />
          <Route path="/home" element={<ProtectedRoute element={<NewRound />} />} />
          <Route path="/myround" element={<ProtectedRoute element={<MyRound />} />} />
          
          {/* <Route path="/design" element={<Design/>} /> */}

        </Routes>

      </div>
    </Router>
  );
}

export default App;
