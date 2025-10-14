import { FaShoppingCart } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { SiKlarna } from "react-icons/si";

export default function TopBanner() {
  const items = [
    {
      icon: <FaShoppingCart className="text-white text-lg" />,
      text: "FREE DELIVERY* & RETURNS",
    },
    {
      icon: <BiTransfer className="text-white text-lg" />,
      text: "30 DAY RETURN POLICY",
    },
    {
      icon: <SiKlarna className="text-white text-lg" />,
      text: "BUY NOW PAY LATER",
    },
  ];

  return (
    <div className="w-full bg-black text-white text-[11px] sm:text-xs font-semibold overflow-hidden">
      {/* Desktop / Tablet View */}
      <div className="hidden sm:flex max-w-7xl mx-auto items-center justify-between px-4 py-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Mobile View (infinite scroll) */}
      <div className="sm:hidden py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...items, ...items].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 mx-6"
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: inline-flex;
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
