import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import EmptyImage from "../assets/cart1.png";
import { useNavigate } from "react-router-dom";

export default function Cart({ setShowModal }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const isLoggedIn = !!user;

  /* ================= FETCH CART ================= */
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://tashya-mendez.onrender.com/api/carts/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      const userId = user?.pk || user?.id;

      // ✅ FIXED: only active cart
      const userCart = data.find(
        (c) =>
          Number(c.user) === Number(userId) && c.is_active === true
      );

      setCartItems(userCart?.items || []);
    } catch (err) {
      console.error("Cart error:", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  /* ================= REMOVE ITEM ================= */
 const removeItem = async (itemId) => {
  const token = user?.access;

  if (!token) return;

  try {
    const res = await fetch(
      `https://tashya-mendez.onrender.com/api/carts/remove/${itemId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const data = await res.json();
      console.error("Remove failed:", data);
      return;
    }

    // update UI instantly
    setCartItems((prev) =>
      prev.filter((item) => item.id !== itemId)
    );

  } catch (err) {
    console.error("Remove error:", err);
  }
};

  /* ================= CHECKOUT PAYPAL ================= */
  const handleCheckout = async () => {
    const token = user?.access;

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(
        "https://tashya-mendez.onrender.com/create-paypal-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart_id: user.pk,
          }),
        }
      );

      const data = await res.json();

      if (data.approval_url) {
        window.location.href = data.approval_url;
      } else {
        alert("Payment failed to start");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout error");
    }
  };

  /* ================= LOADING ================= */
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );

  /* ================= NOT LOGGED IN ================= */
  if (!isLoggedIn)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <img src={EmptyImage} className="w-40" />

        <h2 className="text-xl font-semibold">
          Please login to view your cart
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>
      </div>
    );

  /* ================= EMPTY CART ================= */
  if (!cartItems || cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <img src={EmptyImage} className="w-40" />

        <h2 className="text-xl font-semibold">
          Your cart is empty
        </h2>

        <p className="text-gray-500">
          Start adding products to your cart
        </p>
      </div>
    );

  /* ================= CART UI ================= */
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">

      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

      <div className="space-y-5">

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={item.product_image}
              className="w-20 h-20 object-cover rounded-xl"
            />

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                {item.product_name}
              </h3>

              <p className="text-gray-500 text-sm">
                Quantity: {item.quantity}
              </p>

              <p className="text-gray-500 text-sm">
                Price: ${item.product_price}
              </p>
            </div>

            {/* TOTAL */}
            <div className="text-lg font-bold">
              ${Number(item.total_price).toFixed(2)}
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:scale-110 transition"
            >
              <FaTrash />
            </button>

          </div>
        ))}

      </div>

      {/* CHECKOUT SECTION */}
      <div className="mt-10 bg-gray-100 p-5 rounded-xl flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">Total</p>
          <p className="text-2xl font-bold">
            $
            {cartItems
              .reduce((sum, i) => sum + i.total_price, 0)
              .toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Checkout with PayPal
        </button>

      </div>

    </div>
  );
}