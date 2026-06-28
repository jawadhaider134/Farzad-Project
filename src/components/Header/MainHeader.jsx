import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import IconButtons from "./IconButtons";
import AuthModal from "../AuthModal";
import MobileHeader from "./MobileHeader";

export default function MainHeader() {
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const isLoggedIn = !!user;
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsFixed(currentScrollY > headerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  return (
    <>
      {/* Desktop Header: only show on md and above */}
      <div className="hidden sm:block">
        {isFixed && <div style={{ height: headerHeight }} />}
        <header
          ref={headerRef}
          className={`w-full border-b border-gray-300 transition-all duration-300 ${
            isFixed
              ? "fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-md z-50"
              : "relative bg-white"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-8">
            <Logo />
            <NavLinks location={location} />
            <div className="flex items-center gap-4 md:gap-6 text-xl text-gray-700 relative">
              <IconButtons />
              <UserMenu
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                setShowModal={setShowModal}
              />
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Header: only show below md */}
      <div className="sm:hidden">
        <MobileHeader
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
          setShowModal={setShowModal}
          location={location}
        />
      </div>
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
    </>
  );
}
