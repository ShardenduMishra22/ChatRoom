import { FC, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Chat from './components/Chat';
import AuthGuard from './Auth'; // Import the AuthGuard component
import useUserStore from './zustand/store'; // Import your Zustand store

const App: FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user); // Set the user in Zustand store
      navigate('/chat'); // Navigate to chat if user is found
    }
  }, [setUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/chat" 
          element={
            <AuthGuard>
              <Chat />
            </AuthGuard>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;
