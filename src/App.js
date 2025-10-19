import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider";
import WomenProducts from "./pages/WomenProducts";
import MenProducts from "./pages/MenProducts";
import KidsProducts from "./pages/KidProducts";
import AllCollection from "./pages/AllCollection";
import EmptyWishlist from "./pages/EmptyWishList";
import Cart from "./pages/Cart";
import Footer from "./components/Footer/Footer";
import ProductList from "./pages/ProductList";
import CurrentTrends from "./components/CurrentTrends"
import FilteredProducts from "./components/FilteredProducts";
import SectionProducts from "./components/SectionProducts";
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <HeroSlider />
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
          <Route
            path="/"
            element={
              <DefaultLayout>
                <WomenProducts />
              </DefaultLayout>
            }
          />
          <Route
            path="/women"
            element={
              <DefaultLayout>
                <CurrentTrends />
              </DefaultLayout>
            }
          />
          <Route path="/products/:category" element={
            <AdminLayout>
              <SectionProducts />
          </AdminLayout>} />
          <Route
            path="/men"
            element={
              <DefaultLayout>
                <CurrentTrends />
              </DefaultLayout>
            }
          />
          <Route
            path="/kids"
            element={
              <DefaultLayout>
                <CurrentTrends />
              </DefaultLayout>
            }
          />
          <Route
            path="/collections"
            element={
              <DefaultLayout>
                <CurrentTrends />
              </DefaultLayout>
            }
          />
          <Route
            path="/favourite"
            element={
              <AdminLayout>
                <EmptyWishlist user={user} setShowModal={setShowModal} />
              </AdminLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <AdminLayout>
                <Cart user={user} setShowModal={setShowModal} />
              </AdminLayout>
            }
          />
        <Route path="/products/:category" element={<ProductList />} />
        </Routes>
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
