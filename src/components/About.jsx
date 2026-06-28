import { useEffect, useState } from "react";
import carpet2 from "../assets/carpet_2.jpg";
import carpet3 from "../assets/carpet_3.jpg";
import carpet4 from "../assets/carpet_4.jpg";
import RevealSection from "../components/RevealSection";

export default function About() {
  const carpets = [carpet2, carpet3, carpet4];

  const [loading, setLoading] = useState(true);

  const shimmer =
    "bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)] bg-shimmer animate-shimmer";

  useEffect(() => {
    const images = [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=1600",
      ...carpets,
    ];

    let loaded = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;

      const done = () => {
        loaded++;
        if (loaded === images.length) {
          setLoading(false);
        }
      };

      img.onload = done;
      img.onerror = done;
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f7f1e8]">
        {/* Hero */}
        <div className={`h-[85vh] ${shimmer}`} />

        <div className="h-6 bg-[#7A1F1F]" />

        {/* Story */}
        <RevealSection className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className={`h-[500px] rounded-2xl ${shimmer}`} />

            <div>
              <div className={`h-5 w-40 rounded mb-6 ${shimmer}`} />
              <div className={`h-14 w-80 rounded mb-8 ${shimmer}`} />
              <div className={`h-32 rounded mb-4 ${shimmer}`} />
              <div className={`h-32 rounded ${shimmer}`} />
            </div>
          </div>
        </RevealSection>

        {/* Gallery */}
        <RevealSection className="bg-[#7A1F1F] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className={`h-14 w-80 mx-auto rounded mb-16 ${shimmer}`}
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={`h-[400px] rounded-2xl ${shimmer}`}
                />
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Values */}
        <RevealSection className="max-w-7xl mx-auto py-24 px-6">
          <div
            className={`h-14 w-72 mx-auto rounded mb-16 ${shimmer}`}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-72 rounded-2xl ${shimmer}`}
              />
            ))}
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="bg-[#2b1616] py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className={`h-16 w-96 mx-auto rounded mb-8 ${shimmer}`}
            />

            <div
              className={`h-10 max-w-2xl mx-auto rounded mb-10 ${shimmer}`}
            />

            <div
              className={`h-14 w-64 mx-auto rounded-full ${shimmer}`}
            />
          </div>
        </RevealSection>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f1e8] text-gray-800">
      {/* Hero */}
      <RevealSection className="relative h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600166898405-da9535204843?w=1600"
          alt="Afghan Carpet"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 font-body tracking-[6px] uppercase text-yellow-300">
            Handmade Since Generations
          </p>

          <h1 className="text-5xl font-heading md:text-7xl font-serif font-bold">
            Afghan Carpets
          </h1>

          <div className="mt-6 h-1 w-28 bg-yellow-400" />

          <p className="mt-8 max-w-3xl text-lg md:text-xl">
            Preserving the rich heritage of Afghanistan through beautifully
            handcrafted carpets woven by skilled artisans.
          </p>
        </div>
      </RevealSection>

      <div className="h-6 bg-[#7A1F1F]" />

      {/* Story */}
      <RevealSection className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={carpets[1]}
              alt="Carpet"
              className="rounded-2xl shadow-2xl"
            />

            <div className="absolute -bottom-8 -right-8 bg-[#7A1F1F] text-white p-8 rounded-xl shadow-xl">
              <h3 className="text-4xl font-bold">20+</h3>
              <p>Years of Experience</p>
            </div>
          </div>

          <div>
            <p className="text-[#7A1F1F] uppercase tracking-[4px] font-semibold">
              Our Heritage
            </p>

            <h2 className="text-5xl font-serif mt-4 mb-8 text-[#7A1F1F]">
              Every Carpet Tells a Story
            </h2>

            <p className="text-lg leading-9 text-gray-700">
              Afghan carpets are more than decorations—they are pieces of art
              that carry centuries of tradition and culture.
            </p>

            <p className="mt-6 text-lg leading-9 text-gray-700">
              We work directly with talented weavers to bring authentic handmade
              carpets to homes around the world while preserving the traditions
              that make Afghan carpets unique.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Gallery */}
      <RevealSection className="bg-[#7A1F1F] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl text-center text-yellow-300 font-serif mb-16">
            Our Collection
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {carpets.map((carpet, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl group shadow-2xl"
              >
                <img
                  src={carpet}
                  alt="Afghan Carpet"
                  className="h-[400px] w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Values */}
      <RevealSection className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-[#7A1F1F]">
            Why Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-lg text-center border-t-4 border-[#7A1F1F]">
            <h3 className="text-2xl font-bold mb-4">
              Handmade Excellence
            </h3>
            <p className="text-gray-600">
              Every carpet is handcrafted by experienced Afghan artisans.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg text-center border-t-4 border-[#C89B3C]">
            <h3 className="text-2xl font-bold mb-4">
              Authentic Materials
            </h3>
            <p className="text-gray-600">
              We use premium wool and traditional techniques.
            </p>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg text-center border-t-4 border-[#7A1F1F]">
            <h3 className="text-2xl font-bold mb-4">
              Afghan Heritage
            </h3>
            <p className="text-gray-600">
              Preserving the beauty and culture of Afghanistan.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* CTA */}
      <RevealSection className="bg-[#2b1616] text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-serif text-yellow-300 mb-6">
            Bring Afghan Heritage Into Your Home
          </h2>

          <p className="text-lg text-gray-300 mb-10">
            Explore our handcrafted collection and discover the beauty of
            authentic Afghan carpets.
          </p>

          <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-semibold hover:bg-yellow-300 transition">
            Explore Collection
          </button>
        </div>
      </RevealSection>
    </div>
  );
}