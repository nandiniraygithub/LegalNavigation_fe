/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogDetail from '../pages/BlogDetail'
import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900"> Legal Navigation Blog </span>
            </Link>
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}