import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, PenSquare, LayoutDashboard } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin" className="flex items-center px-4 text-gray-900 hover:text-indigo-600">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                <span className="font-medium">Admin Dashboard</span>
              </Link>
              <Link to="/admin/create" className="flex items-center px-4 text-gray-900 hover:text-indigo-600">
                <PenSquare className="h-5 w-5 mr-2" />
                <span className="font-medium">New Post</span>
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 text-gray-900 hover:text-indigo-600"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}