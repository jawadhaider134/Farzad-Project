import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          "https://tashya-mendez.onrender.com/api/sections/"
        );

        const activeCategories = res.data.filter(
          (cat) => cat.is_active
        );

        setCategories(activeCategories);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <section className="bg-[#f7f1e8] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-[#7A1F1F] font-semibold">
            Explore Our Collection
          </p>

          <h2 className="text-4xl md:text-5xl font-heading text-[#7A1F1F] mt-4">
            Categories
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="relative h-72 overflow-hidden rounded-2xl shadow-xl bg-gray-200"
                >
                  {/* Image shimmer */}
                  <div
                    className="
                      absolute inset-0
                      bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)]
                      bg-shimmer
                      animate-shimmer
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10" />

                  {/* Text skeleton */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                    <div
                      className="
                        h-7 w-32 rounded-md mb-3
                        bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)]
                        bg-shimmer
                        animate-shimmer
                      "
                    />

                    <div
                      className="
                        h-4 w-44 rounded-md
                        bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)]
                        bg-shimmer
                        animate-shimmer
                      "
                    />
                  </div>
                </div>
              ))
            : categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/products/${cat.name}`)}
                  className="relative cursor-pointer overflow-hidden rounded-2xl shadow-xl group"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <h3 className="text-white text-2xl font-heading">
                      {cat.name}
                    </h3>

                    {cat.description && (
                      <p className="text-white/80 text-sm mt-2">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}