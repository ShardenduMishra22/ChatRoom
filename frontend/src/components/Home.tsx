import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Home: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Welcome to Our App</h1>
        <p className="text-gray-300">
          Get started by signing in or creating an account.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/signin">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
