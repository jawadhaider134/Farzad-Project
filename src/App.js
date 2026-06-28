import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

import AuthModal from "./components/AuthModal";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Footer from "./components/Footer/Footer";
import ProductList from "./pages/ProductList";
import About from "./components/About";
import Contact from "./components/Contact";

// ✅ NEW: Categories Section import
import CategoriesSection from "./components/CategoriesSection";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <GoogleOAuthProvider clientId="546605370258-l8ecnn762q3ftcu7teg7cjlb077534a1.apps.googleusercontent.com">
      <Router>
        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <DefaultLayout>
                <HeroSlider />
                <CategoriesSection /> 
              </DefaultLayout>
            }
          />

          {/* HOME ALIAS */}
          <Route
            path="/home"
            element={
              <DefaultLayout>
                <HeroSlider />
                <CategoriesSection />  
              </DefaultLayout>
            }
          />

          {/* ABOUT */}
          <Route
            path="/aboutus"
            element={
              <DefaultLayout>
                <About />
              </DefaultLayout>
            }
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={
              <DefaultLayout>
                <Contact />
              </DefaultLayout>
            }
          />

          {/* WISHLIST */}
          <Route
            path="/favourite"
            element={
              <AdminLayout>
                <Wishlist user={user} setShowModal={setShowModal} />
              </AdminLayout>
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <AdminLayout>
                <Cart user={user} setShowModal={setShowModal} />
              </AdminLayout>
            }
          />

          {/* PRODUCTS BY CATEGORY */}
          <Route
            path="/products/:category"
            element={
            <AdminLayout>
              <ProductList setShowModal={setShowModal} />
            </AdminLayout>
          }
          />

        </Routes>

        {/* AUTH MODAL */}
        {showModal && (
          <AuthModal
            onClose={() => setShowModal(false)}
            onLoginSuccess={(data) => {
              const userData = {
                pk: data.user.pk,
                username: data.user.username,
                email: data.user.email,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                role: data.role,
                access: data.access,
                refresh: data.refresh,
              };

              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));
              setShowModal(false);
            }}
          />
        )}
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;