import { FaRegBell, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function IconButtons() {
  const navigate = useNavigate();

  const handleHeartClick = () => {
    navigate("/favourite");
  };
  const handleCart = () => {
    navigate("/cart")
  }

  return (
    <>
      <button
        aria-label="Favorites"
        onClick={handleHeartClick}
        className="hover:text-black"
      >
        <FaRegHeart />
      </button>

      <button aria-label="Shopping Bag" className="hover:text-black" onClick={handleCart}>
        <FaShoppingBag />
      </button>
    </>
  );
}
