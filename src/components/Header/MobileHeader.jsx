import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import IconButtons from "./IconButtons";
import Footer from "../Footer/Footer";

export default function MobileHeader({ user, setUser, isLoggedIn, setShowModal, location, setNotifOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Detect scroll for mobile header
  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsFixed(currentScrollY > headerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerHeight]);

  // Close menu on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {isFixed && <div style={{ height: headerHeight }} />} {/* preserves space */}
      <header
        ref={headerRef}
        className={`w-full border-b border-gray-300 transition-all duration-300 ${
          isFixed
            ? "fixed top-0 left-0 bg-white/70 backdrop-blur-md shadow-md z-50"
            : "relative bg-white"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center gap-1">
            <button
              className="text-xl"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>

            {/* Center-left: Logo with a little gap */}
            <div>
              <Logo />
            </div>
          </div>

          {/* Right: Icons (notifications, user, cart, favourite) */}
          <div className="flex items-center gap-4 text-xl text-gray-700">
            <IconButtons setNotifOpen={setNotifOpen} />
            <UserMenu
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={setUser}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top orange bar inside side menu */}
        <div className="h-16 bg-orange-500 flex items-center justify-between px-4">
          <Logo />
          <button
            className="text-white text-2xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* Menu content */}
        <div className="mt-4 px-6 flex flex-col gap-6 overflow-y-auto h-[calc(100%-64px)]">
          <NavLinks isMobile={true} location={location} onLinkClick={() => setMenuOpen(false)} />
        <Footer />
        </div>
      </div>
    </>
  );
}
