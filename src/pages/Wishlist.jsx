import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const token = localStorage.getItem("access");

  /* ================= IMAGE HANDLER ================= */
  const getImage = (product) => {
    return (
      product?.sub_images?.[0]?.image ||
      product?.image ||
      product?.product_image ||
      "https://via.placeholder.com/300"
    );
  };

  /* ================= LOAD WISHLIST ================= */
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);

        let backendItems = [];
        const localFavs = JSON.parse(localStorage.getItem("favs") || "{}");

        // STEP 1: backend favorites
        if (token && token !== "undefined") {
          const res = await fetch(
            "https://tashya-mendez.onrender.com/api/favorites/",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            backendItems = await res.json();
          }
        }

        // STEP 2: local favorites → convert to same format
        const localItems = Object.keys(localFavs)
          .filter((id) => localFavs[id])
          .map((id) => ({
            id: `local-${id}`,
            product: {
              id: parseInt(id),
              name: "Saved Product",
              price: "N/A",
              sub_images: [],
            },
            isLocal: true,
          }));

        // STEP 3: merge both
        const merged = [...backendItems];

        localItems.forEach((localItem) => {
          const exists = merged.some(
            (i) => i.product?.id === localItem.product.id
          );

          if (!exists) merged.push(localItem);
        });

        setItems(merged);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  /* ================= REMOVE ITEM ================= */
  const removeItem = async (item) => {
    const productId = item.product?.id;

    try {
      setRemovingId(productId);

      // remove from localStorage
      const localFavs = JSON.parse(localStorage.getItem("favs") || "{}");
      delete localFavs[productId];
      localStorage.setItem("favs", JSON.stringify(localFavs));

      // UI animation delay
      setTimeout(() => {
        setItems((prev) =>
          prev.filter((i) => i.product?.id !== productId)
        );
      }, 250);

      // backend sync
      if (token && token !== "undefined" && !item.isLocal) {
        await fetch(
          "https://tashya-mendez.onrender.com/api/favorites/toggle/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id: productId,
            }),
          }
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setRemovingId(null), 300);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!items.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        No favorites yet
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {items.map((item) => {
        const product = item.product;

        return (
          <div
            key={item.id}
            className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300
              ${removingId === product?.id ? "opacity-0 scale-90" : "opacity-100 scale-100"}
            `}
          >

            {/* IMAGE */}
            <img
              src={getImage(product)}
              className="w-full h-48 object-cover"
              alt={product?.name}
            />

            {/* TRASH ICON */}
            <button
              onClick={() => removeItem(item)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center
                          bg-transparent rounded-full
                         hover:bg-gray-100 hover:text-white transition"
            >
              <FaTrash className="text-black text-sm" />
            </button>

            {/* INFO */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">
                {product?.name || "Product Name"}
              </h3>

              <p className="text-[#7A1F1F] font-bold mt-2">
                {product?.price ? `${product.price}$` : "0$"}
              </p>
            </div>

          </div>
        );
      })}
    </div>
  );
}