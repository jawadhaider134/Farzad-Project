import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaUser,
  FaSearch,
  FaShoppingCart,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-8 py-4 bg-white shadow-md">

        {/* LEFT - LOGO */}
        <div className="text-2xl font-bold text-gray-800">
          MyLogo
        </div>

        {/* CENTER - LINKS (DESKTOP ONLY) */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link className="hover:text-blue-500" to="/">Home</Link>
          <Link className="hover:text-blue-500" to="/about">About Us</Link>
          <Link className="hover:text-blue-500" to="/contact">Contact Us</Link>
        </nav>

        {/* RIGHT - DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-5 text-gray-700 text-lg">

          <FaSearch className="cursor-pointer hover:text-blue-500" />
          <FaHeart className="cursor-pointer hover:text-red-500" />
          <FaUser className="cursor-pointer hover:text-blue-500" />
          <FaShoppingCart className="cursor-pointer hover:text-green-500" />

        </div>

        {/* MOBILE RIGHT SIDE (ICONS + MENU) */}
        <div className="flex md:hidden items-center gap-5 text-gray-700 text-lg">

          <FaSearch className="cursor-pointer hover:text-blue-500" />
          <FaHeart className="cursor-pointer hover:text-red-500" />
          <FaUser className="cursor-pointer hover:text-blue-500" />
          <FaShoppingCart className="cursor-pointer hover:text-green-500" />

          <FaBars
            className="text-xl cursor-pointer ml-2"
            onClick={() => setOpen(true)}
          />

        </div>

      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >

        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <FaTimes
            className="cursor-pointer text-xl"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* LINKS */}
        <nav className="flex flex-col gap-6 px-6 text-gray-700 font-medium">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/about">About Us</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact Us</Link>
        </nav>

      </div>
    </>
  );
}