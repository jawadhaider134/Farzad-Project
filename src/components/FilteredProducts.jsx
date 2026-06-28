import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function FilteredProducts() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const tags = searchParams.get("tags")?.split(",") || [];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://tashya-mendez.onrender.com/api/products/filter"
        );
        let filtered = response.data;

        // Filter by category
        if (category) {
          filtered = filtered.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
        }

        // Filter by tags
        if (tags.length > 0) {
          filtered = filtered.filter((p) =>
            tags.some((tag) => p.tags.includes(tag))
          );
        }

        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch filtered products:", err);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [category, tags]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (products.length === 0)
    return <div className="text-center py-10">No products found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          {product.sub_images[0] && (
            <img
              src={product.sub_images[0].image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-3">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
