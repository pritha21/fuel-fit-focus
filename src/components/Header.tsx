import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Diet Tracker
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User size={16} />
            <span>{user.email}</span>
          </div>
          <Link to="/profile">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Settings size={16} />
              <span>Profile</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
