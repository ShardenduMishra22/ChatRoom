import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const Home: FC = () => {
  return (
      <div>
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
      </div>
  );
};

export default Home;
