import { Link } from "react-router-dom";

export default function NavLinks({ location, isMobile = false, onLinkClick }) {
  const categories = [
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "Kids", path: "/kids" },
    { name: "All Collections", path: "/collections" },
  ];

  return (
    <nav
      className={`${
        isMobile ? "flex flex-col gap-4" : "flex gap-4 h-full"
      } text-gray-700 font-medium`}
    >
      {categories.map((cat) => {
        const isActive =
          (cat.path === "/women" &&
            (location.pathname === "/" || location.pathname === "/women")) ||
          location.pathname === cat.path;

        return (
          <Link
            key={cat.name}
            to={cat.path}
            onClick={() => {
              if (onLinkClick) onLinkClick(); // closes menu on mobile
            }}
            className={`${
              isMobile
                ? `text-lg ${isActive ? "text-black font-semibold" : "hover:text-orange-500"}`
                : `flex items-center ${
                    isActive
                      ? "border-b-2 border-black text-black"
                      : "hover:text-black"
                  }`
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
