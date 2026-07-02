import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function ProductList() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const [toast, setToast] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, sectionsRes] = await Promise.all([
          axios.get("https://tashya-mendez.onrender.com/api/products/"),
          axios.get("https://tashya-mendez.onrender.com/api/sections/"),
        ]);

        const cleaned = decodeURIComponent(category)
          .trim()
          .toLowerCase();

        const matched = sectionsRes.data.find(
          (c) => c.name?.trim().toLowerCase() === cleaned
        );

        setCategoryData(matched);

        const filtered = productsRes.data.filter(
          (p) =>
            String(p.category || "")
              .trim()
              .toLowerCase() === cleaned
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

  /* ================= FAVORITES ================= */
  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem("favs") || "{}");
    setFavorites(localFavs);
  }, []);

  const toggleFavorite = async (product) => {
    const token =
      JSON.parse(localStorage.getItem("user") || "{}")?.access;

    const localFavs = JSON.parse(localStorage.getItem("favs") || "{}");

    localFavs[product.id] = !localFavs[product.id];

    localStorage.setItem("favs", JSON.stringify(localFavs));
    setFavorites({ ...localFavs });

    if (token) {
      try {
        await fetch(
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
      } catch (err) {
        console.error(err);
      }
    }
  };

  /* ================= ADD TO CART ================= */
  const addToCart = async (product) => {
    const token =
      JSON.parse(localStorage.getItem("user") || "{}")?.access;

    if (!token) return;

    try {
      await fetch(
        "https://tashya-mendez.onrender.com/api/carts/add/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity: 1,
          }),
        }
      );

      setToast("Added to cart 🛒");
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      console.error(err);
      setToast("Failed to add");
      setTimeout(() => setToast(""), 2000);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="h-80 rounded-2xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

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
          <h1 className="text-4xl font-bold">
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
            className="relative rounded-2xl shadow-lg overflow-hidden bg-white"
          >

            {/* IMAGE */}
            <img
              src={product.sub_images?.[0]?.image}
              className="w-full h-64 object-cover"
            />

            {/* HEART */}
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
            >
              {favorites[product.id] ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FiHeart />
              )}
            </button>

            {/* INFO */}
            <div className="p-4">

              <h3 className="text-sm font-medium text-gray-500">
                Product
              </h3>

              <p className="text-lg font-bold mb-2">
                ${product.price}
              </p>

              {/* ADD TO CART (ALWAYS VISIBLE) */}
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}