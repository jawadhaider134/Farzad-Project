import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const token = localStorage.getItem("access");

  const getImage = (product) => {
    return (
      product?.sub_images?.[0]?.image ||
      product?.image ||
      product?.product_image ||
      "https://via.placeholder.com/300"
    );
  };

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);

        let backendItems = [];

        const localFavs = JSON.parse(
          localStorage.getItem("favs") || "{}"
        );

        // Get all products
        const productsRes = await fetch(
          "https://tashya-mendez.onrender.com/api/products/"
        );

        const allProducts = await productsRes.json();

        // Backend favorites
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

        // Local favorites -> find real product data
        const localItems = Object.keys(localFavs)
          .filter((id) => localFavs[id])
          .map((id) => {
            const product = allProducts.find(
              (p) => p.id === parseInt(id)
            );

            return {
              id: `local-${id}`,
              product,
              isLocal: true,
            };
          })
          .filter((item) => item.product);

        // Merge backend + local
        const merged = [...backendItems];

        localItems.forEach((localItem) => {
          const exists = merged.some(
            (i) =>
              i.product?.id === localItem.product?.id
          );

          if (!exists) {
            merged.push(localItem);
          }
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

  const removeItem = async (item) => {
    const productId = item.product?.id;

    try {
      setRemovingId(productId);

      const localFavs = JSON.parse(
        localStorage.getItem("favs") || "{}"
      );

      delete localFavs[productId];

      localStorage.setItem(
        "favs",
        JSON.stringify(localFavs)
      );

      setTimeout(() => {
        setItems((prev) =>
          prev.filter(
            (i) => i.product?.id !== productId
          )
        );
      }, 250);

      if (
        token &&
        token !== "undefined" &&
        !item.isLocal
      ) {
        await fetch(
          "https://tashya-mendez.onrender.com/api/favorites/toggle/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json",
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
      setTimeout(
        () => setRemovingId(null),
        300
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-80 rounded-2xl bg-gray-200 animate-pulse"
            />
          ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500 text-xl">
        No favorites yet
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const product = item.product;

        return (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-2xl shadow-lg h-80 group transition-all duration-300 ${
              removingId === product?.id
                ? "opacity-0 scale-90"
                : "opacity-100 scale-100"
            }`}
          >
            <img
              src={getImage(product)}
              className="w-full h-full object-cover group-hover:scale-110 transition"
              alt={product?.name}
            />

            <button
              onClick={() => removeItem(item)}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md hover:bg-white"
            >
              <FaTrash className="text-red-500" />
            </button>

            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <h3 className="text-sm font-semibold">
                {product?.name}
              </h3>

              <p className="text-lg font-bold">
                {product?.price}$
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

