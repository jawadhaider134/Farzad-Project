import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://tashya-mendez.onrender.com/api/products/")
      .then((res) => {
        // filter by category name (IMPORTANT)
        const filtered = res.data.filter(
          (item) => item.category === category
        );
        setProducts(filtered);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Title */}
      <h2 className="text-3xl font-heading font-bold capitalize mb-6">
        {category} Collection
      </h2>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            <img
              src={product.sub_images?.[0]?.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-600 mt-1">
                {product.category}
              </p>

              <p className="font-bold text-xl mt-2 text-[#7A1F1F]">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}