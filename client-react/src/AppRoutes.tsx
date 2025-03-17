import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/home';
import Profile from './pages/Profile';
import About from './pages/About';
import Exams from './pages/Exams';
import Dashboard from './pages/Dashboard';
import AuthForm from './components/Auth/AuthForm';
import ExamList from './components/Exams/ExamList';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <h1>Error</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/home', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/authForm', element: <AuthForm /> },
            {
                path: '/exams',
                element: <Exams />,
                children: [
                    { path: '', element: <ExamList /> }, // רשימת הבחינות
                    
                ],
            },
            { path: '/dashboard', element: <Dashboard /> },
            { path: '/profile', element: <Profile /> },
        ],
    },
])