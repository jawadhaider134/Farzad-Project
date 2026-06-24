import { FaShoppingCart, FaUndo, FaMoneyBillWave } from "react-icons/fa";

export default function TopBanner() {
  return (
    <div className="w-full bg-[#F6E9D9] text-black overflow-hidden">

      {/* 📱 MOBILE: ANIMATED MARQUEE */}
      <div className="flex w-max animate-marquee md:hidden">

        {/* item set (for smooth loop ONLY mobile) */}
        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaShoppingCart />
          <span>Free delivery & return</span>
        </div>

        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaUndo />
          <span>30 day return policy</span>
        </div>

        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaMoneyBillWave />
          <span>Buy now pay later</span>
        </div>

        {/* duplicate for smooth loop */}
        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaShoppingCart />
          <span>Free delivery & return</span>
        </div>

        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaUndo />
          <span>30 day return policy</span>
        </div>

        <div className="flex items-center gap-3 px-12 py-2 text-sm">
          <FaMoneyBillWave />
          <span>Buy now pay later</span>
        </div>

      </div>

      {/* 💻 TABLET + DESKTOP: CLEAN 3 ITEMS ONLY */}
      <div className="hidden md:flex w-full justify-between items-center px-10 py-2 text-sm">

        <div className="flex items-center gap-3 flex-1 justify-center">
          <FaShoppingCart />
          <span>Free delivery & return</span>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-center">
          <FaUndo />
          <span>30 day return policy</span>
        </div>

        <div className="flex items-center gap-3 flex-1 justify-center">
          <FaMoneyBillWave />
          <span>Buy now pay later</span>
        </div>

      </div>

    </div>
  );
}