import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import useUserStore from '../zustand/store'; // Adjust the import according to your file structure

const SignIn: FC = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser); // Get the setUser function from Zustand
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/signin', {
        email: formData.email,
        password: formData.password,
      });

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user); // Set user in Zustand store
      console.log('Sign in successful:', user);
      navigate('/chat');
    } catch (error) {
      console.error('Sign in failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Failed to sign in');
      } else {
        setErrorMessage('Failed to sign in');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[380px] shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  type="password" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required 
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">Sign up</a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignIn;
