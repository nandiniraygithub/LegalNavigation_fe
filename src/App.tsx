/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ContactForm from "./components/ConatctForm";
import Trademarkpage from "./pages/Trademarkpage";

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
  const [showContactForm, setShowContactForm] = useState(false);

  const location = useLocation();
  const path = location.pathname.toLowerCase(); // Normalize for case-insensitive comparison

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

  // Define routes where footer should be hidden
  const hideFooterRoutes = [
    "/post-blog",
    "/practice/trademark",
    "/practice/trademarkpage"
  ];

  const shouldHideFooter =
    hideFooterRoutes.includes(path) || path.startsWith("/post/");

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
                    <Hero setShowContactForm={setShowContactForm} />
                    <About />
                    <PracticeAreas />
                    <Updates />
                    <Clients />
                  </>
                }
              />

              <Route path="/practice/trademarkpage" element={<Trademarkpage />} />
              <Route path="/practice/trademark" element={<Trademark />} />
              <Route path="/practiceareas" element={<PracticeAreas />} />
              <Route path="/about" element={<About />} />
              <Route path="/post-blog" element={<BlogList />} />
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

          {/* Conditionally render Footer */}
          {!shouldHideFooter && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;
