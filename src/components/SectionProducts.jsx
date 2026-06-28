import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GrFormPrevious } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function SectionProducts() {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionImage, setSectionImage] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionFilters, setSectionFilters] = useState([]);

  // Sorting state
  const [sortByPriceOpen, setSortByPriceOpen] = useState(false);
  const [sortByColorOpen, setSortByColorOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const fetchProductsAndSection = async () => {
      setLoading(true);
      try {
        let sections = JSON.parse(localStorage.getItem("sections") || "[]");
        if (!sections.length) {
          const secRes = await axios.get(
            "https://tashya-mendez.onrender.com/api/sections/"
          );
          sections = secRes.data.filter((s) => s.is_active);
          localStorage.setItem("sections", JSON.stringify(sections));
        }

        const searchParams = new URLSearchParams(location.search);
        const tagsParam = searchParams.get("tags") || "";
        const tags = tagsParam.split(",").map((t) => t.toLowerCase());

        const currentSection = sections.find((s) => {
          const sectionCategory = s.filter_by.category.toLowerCase();
          const sectionTags = (s.filter_by.tags || []).map((t) =>
            t.toLowerCase()
          );
          return (
            sectionCategory === category.toLowerCase() &&
            tags.every((t) => sectionTags.includes(t))
          );
        });

        if (currentSection) {
          setSectionImage(currentSection.image);
          setSectionName(currentSection.name);
          setSectionDescription(currentSection.description || "");
          setSectionFilters(currentSection.filter_by?.tags || []);
        }

        let allProducts = [];
        try {
          const prodRes = await axios.get(
            "https://tashya-mendez.onrender.com/api/products/"
          );
          allProducts = prodRes.data;
          localStorage.setItem("products", JSON.stringify(allProducts));
        } catch (err) {
          console.error("Failed to fetch products from API:", err);
        }

        const filtered = allProducts.filter((p) => {
          const productCategory = p.category.toLowerCase();
          const productTags = (p.tags || []).map((t) => t.toLowerCase());
          return (
            productCategory === category.toLowerCase() &&
            (tags.length ? tags.some((tag) => productTags.includes(tag)) : true)
          );
        });

        setProducts(filtered);
        setSortedProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products or section:", err);
        setProducts([]);
        setSortedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndSection();
  }, [category, location.search]);

  const sortByPrice = (order) => {
    const sorted = [...products].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
    setSortByPriceOpen(false);
  };

  const sortByColor = (color) => {
    const sorted = [...products].sort((a, b) => {
      if (a.color === color && b.color !== color) return -1;
      if (a.color !== color && b.color === color) return 1;
      return 0;
    });
    setSortedProducts(sorted);
    setSortByColorOpen(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-lg">
        <img
          src={sectionImage}
          alt={sectionName}
          className="w-full h-full object-cover object-center"
        />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition"
        >
          <GrFormPrevious />
        </button>

        {/* Overlay with Description & Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {sectionDescription && (
            <p className="text-white text-sm md:text-xl mb-2 drop-shadow-lg">
              {sectionDescription}
            </p>
          )}
          <h1 className="text-white text-5xl md:text-5xl font-bold drop-shadow-xl">
            {sectionName}
          </h1>
        </div>
      </div>

      {/* Sidebar + Products Grid */}
      <div className="max-w-[90rem] mx-auto px-3 sm:px-0 py-10 flex flex-col lg:flex-row gap-6">
        {/* Sidebar (hidden on mobile) */}
        <aside className="hidden lg:block w-1/6">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaPlay className="text-black w-2 h-2" />
            All items
          </h3>
          {sectionFilters.length ? (
            <ul className="space-y-2 pl-6">
              {sectionFilters.map((tag) => (
                <li key={tag}>
                  <button
                    className="text-black hover:text-red-500 text-xl font-md"
                    onClick={() => {
                      const params = new URLSearchParams(location.search);
                      params.set("tags", tag);
                      navigate(`${location.pathname}?${params.toString()}`);
                    }}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pl-4 text-gray-500">No sections available</p>
          )}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{sectionName}</h2>
          <hr className="border-gray-300 mb-4" />

          {/* Sorting Buttons (hidden on mobile) */}
          <div className="hidden lg:flex gap-4 mb-6">
            {/* Sort by Price */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                onClick={() => setSortByPriceOpen(!sortByPriceOpen)}
              >
                Price {sortByPriceOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {sortByPriceOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-md border rounded z-10 w-32">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => sortByPrice("asc")}
                  >
                    Low to High
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => sortByPrice("desc")}
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>

            {/* Sort by Color */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                onClick={() => setSortByColorOpen(!sortByColorOpen)}
              >
                Color {sortByColorOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {sortByColorOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-md border rounded z-10 w-32">
                  {Array.from(new Set(products.map((p) => p.color))).map(
                    (color) => (
                      <button
                        key={color}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
                        onClick={() => sortByColor(color)}
                      >
                        {color}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <p>Loading products...</p>
          ) : !sortedProducts.length ? (
            <p>No products found for this section.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg overflow-hidden p-1 hover:border hover:border-gray-300 flex flex-col sm:mb-10 transition-all duration-300"
                >
                  <div className="relative w-full h-[16rem] sm:h-[22rem] overflow-hidden rounded-md">
                    <img
                      src={
                        product.sub_images?.[0]?.image ||
                        "https://via.placeholder.com/400x400?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                    <button className="absolute top-2 right-2 bg-white/50 rounded-full p-1 transition">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center mt-3 p-4">
                    <h3 className="font-bold text-sm">{product.name}</h3>
                    <p className="text-red-500 text-xs font-bold mt-1">
                      $ {product.price}
                    </p>
                    {product.color && (
                      <div className="flex space-x-1 mt-2">
                        <span
                          className="w-4 h-4 rounded-full border border-gray-400"
                          style={{ backgroundColor: product.color }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
