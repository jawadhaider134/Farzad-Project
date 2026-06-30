import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

/* ================= HEART ICON ================= */
const HeartIcon = ({ active }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 transition"
      fill={active ? "#ef4444" : "transparent"}
      stroke={active ? "#ef4444" : "#000"}
      strokeWidth="2"
    >
      <path d="M12 21s-6.7-4.35-9.33-7.6C-0.1 10.1 2.2 5.7 6.3 5.1 8.4 4.8 10 6 12 8c2-2 3.6-3.2 5.7-2.9 4.1.6 6.4 5 3.63 8.3C18.7 16.65 12 21 12 21z" />
    </svg>
  );
};

export default function ProductList() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, sectionsRes] = await Promise.all([
          axios.get("https://tashya-mendez.onrender.com/api/products/"),
          axios.get("https://tashya-mendez.onrender.com/api/sections/"),
        ]);

        const cleanedCategory = decodeURIComponent(category)
          .trim()
          .toLowerCase();

        const matchedCategory = sectionsRes.data.find(
          (cat) =>
            cat.name?.trim().toLowerCase() === cleanedCategory
        );

        setCategoryData(matchedCategory);

        const filtered = productsRes.data.filter((item) =>
          String(item.category || "")
            .trim()
            .toLowerCase() === cleanedCategory
        );

        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  /* ================= LOAD LOCAL FAVORITES ================= */
  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem("favs") || "{}");
    setFavorites(localFavs);
  }, []);

  /* ================= TOGGLE FAVORITE ================= */
const toggleFavorite = async (product) => {
  const token =
    JSON.parse(localStorage.getItem("user") || "{}")?.access;

  // Update localStorage (guest users)
  const localFavs = JSON.parse(
    localStorage.getItem("favs") || "{}"
  );

  localFavs[product.id] = !localFavs[product.id];

  localStorage.setItem(
    "favs",
    JSON.stringify(localFavs)
  );

  // Update UI immediately
  setFavorites({ ...localFavs });

  // Sync with backend if logged in
  if (token) {
    try {
      const response = await fetch(
        "https://tashya-mendez.onrender.com/api/favorites/toggle/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
          }),
        }
      );

      const data = await response.json();

      console.log("Favorite response:", data);
    } catch (err) {
      console.error("Favorite sync error:", err);
    }
  }
};
  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-80 rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>

      {/* HERO */}
      <div
        className="relative h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${categoryData?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md"
        >
          <FaArrowLeft />
        </button>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold">
            {categoryData?.name || category}
          </h1>
          <p className="mt-2 text-white/80">
            {categoryData?.description}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden rounded-2xl shadow-lg h-80 group"
          >

            {/* IMAGE */}
            <img
              src={product.sub_images?.[0]?.image}
              className="w-full h-full object-cover group-hover:scale-110 transition"
            />

            {/* HEART */}
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-3 right-3"
            >
              <HeartIcon active={favorites[product.id]} />
            </button>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-sm font-semibold">
                Best selling
              </h3>
              <p className="text-lg font-bold">
                {product.price}$
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}