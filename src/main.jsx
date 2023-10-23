import Home from './components/Home'
import React from 'react'
import Layout from './components/Layout'
import ReactDOM from 'react-dom/client'
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Practice from './components/Practice';
import Tutor from './components/Tutor';
import AuthRequired from './components/AuthRequired'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import Error from './components/Error'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import {AuthProvider} from './components/AuthContext'
 
  
ReactDOM.createRoot(document.getElementById('root'))
.render(
<BrowserRouter>
    <AuthProvider>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route element={<AuthRequired /> }>
                    <Route path='dashboard' element={<Dashboard />} >
                        <Route index element={<Summary />} />
                        <Route path="practice" element={<Practice />} />
                        <Route path="tutor" element={<Tutor />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<Error />}/>
        </Routes>
    </AuthProvider>
</BrowserRouter>);
