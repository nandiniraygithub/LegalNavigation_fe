import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DisclaimerModal from "./components/DisclaimerModal";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import PracticeAreas from "./components/PracticeAreas";
import Updates from "./components/Updates";
import Clients from "./components/Clients";
import Trademark from "./pages/Trademarkpage";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import ViewPost from "./components/ViewPost";
import Login from "./components/Login";
import { useAuth } from "../hooks/useAuth";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const location = useLocation()

  useEffect(() => {
    const hasAccepted = localStorage.getItem("disclaimerAccepted");
    if (hasAccepted === "true") {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShowDisclaimer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showDisclaimer ? (
        <DisclaimerModal onAccept={handleAcceptDisclaimer} />
      ) : (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <PracticeAreas />
                    <Updates />
                    <Clients />
                  </>
                }
              />
              <Route path="/post-blog" element={<BlogList />} />
              <Route path="/practice/trademark" element={<Trademark />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/post/:id" element={<ViewPost />} />
              <Route path="/login" element={<Login />} />

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="edit/:id" element={<EditPost />} />
              </Route>
            </Routes>
          </main>
          {location.pathname !== '/post-blog' && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
