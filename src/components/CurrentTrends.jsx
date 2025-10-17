import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function CurrentTrends() {
  const [trends, setTrends] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        // Check localStorage first
        const storedSections = localStorage.getItem("sections");
        let activeSections;

        if (storedSections) {
          activeSections = JSON.parse(storedSections);
        } else {
          const response = await axios.get(
            "https://tashya-mendez.onrender.com/api/sections/"
          );
          activeSections = response.data.filter((section) => section.is_active);

          // Save to localStorage
          localStorage.setItem("sections", JSON.stringify(activeSections));
        }

        // Determine category based on route
        const path = location.pathname.toLowerCase();
        let filteredSections = activeSections;

        if (path === "/men") {
          filteredSections = activeSections.filter(
            (section) => section.filter_by.category.toLowerCase() === "men"
          );
        } else if (path === "/women") {
          filteredSections = activeSections.filter(
            (section) => section.filter_by.category.toLowerCase() === "women"
          );
        } else if (path === "/kids") {
          filteredSections = activeSections.filter(
            (section) => section.filter_by.category.toLowerCase() === "kids"
          );
        }
        // Else "/" or "/collections" will show all sections

        setTrends(filteredSections);
      } catch (err) {
        console.error("Failed to fetch sections:", err);
        setTrends([]);
      }
    };

    fetchSections();
  }, [location.pathname]);

  // Scroll helpers
  const getCardStep = () => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return 0;
    const cardWidth = el.firstElementChild.getBoundingClientRect().width;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.gap) || 0;
    return cardWidth + gap;
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const tolerance = 2;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - tolerance);
  };

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(checkScroll);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const initial = setTimeout(checkScroll, 50);
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    const imgs = Array.from(el.querySelectorAll("img"));
    const onImgLoad = () => handleScroll();
    imgs.forEach((img) => img.addEventListener("load", onImgLoad));

    return () => {
      clearTimeout(initial);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      imgs.forEach((img) => img.removeEventListener("load", onImgLoad));
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trends]);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep() || el.clientWidth;
    const target = Math.min(el.scrollLeft + step * 4, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: target, behavior: "smooth" });
    const tolerance = 2;
    setCanScrollLeft(target > tolerance);
    setCanScrollRight(target < el.scrollWidth - el.clientWidth - tolerance);
  };

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep() || el.clientWidth;
    const target = Math.max(el.scrollLeft - step * 4, 0);
    el.scrollTo({ left: target, behavior: "smooth" });
    const tolerance = 2;
    setCanScrollLeft(target > tolerance);
    setCanScrollRight(target < el.scrollWidth - el.clientWidth - tolerance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="uppercase text-gray-600 font-semibold tracking-wide">
            Curated by us
          </h4>
          <h2 className="text-3xl font-bold">Current trends</h2>
        </div>
        <div className="flex">
          <button
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            className={`p-3 border border-gray-200 rounded-l-full rounded-r-none transition
              ${!canScrollLeft ? "opacity-40 cursor-default" : "hover:bg-gray-100"}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollRight}
            className={`p-3 border border-gray-200 rounded-r-full rounded-l-none transition
              ${!canScrollRight ? "opacity-40 cursor-default" : "hover:bg-gray-100"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {trends.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.name}`}
            className="min-w-[250px] md:min-w-[300px] rounded-lg overflow-hidden flex-shrink-0 
                       cursor-pointer transition-transform duration-300 block"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="p-3 text-left">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
