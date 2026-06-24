import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "../components/Loader";
export default function Hero(){
     const [heroes, setHeroes] = useState([]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const DURATION = 5000;

  // FETCH HERO DATA
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(
          "https://tashya-mendez.onrender.com/api/hero/"
        );

        const active = res.data
          .filter((item) => item.is_active)
          .sort((a, b) => a.order - b.order);

        setHeroes(active);

        // preload images for smooth experience
        active.forEach((item) => {
          const img = new Image();
          img.src = item.image;
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // AUTO SLIDER + PROGRESS
  useEffect(() => {
    if (!heroes.length) return;

    setProgress(0);

    const interval = 50;
    const step = 100 / (DURATION / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;

        if (next >= 100) {
          setIndex((i) => (i + 1) % heroes.length);
          return 0;
        }

        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [index, heroes]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % heroes.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? heroes.length - 1 : prev - 1
    );
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!heroes.length) {
    return <div className="p-10 text-center">No hero data found</div>;
  }

  const hero = heroes[index];
  if (loading) return <Loader />;
    return (
         <section className="relative w-full h-[85vh] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        key={hero.id}
        src={hero.image}
        alt={hero.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
      />

      {/* DARK OVERLAY (FIXED FOR READABILITY) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* HERO TEXT */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <h1 className="text-white text-3xl md:text-6xl font-bold max-w-3xl leading-tight">
          {hero.title}
        </h1>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-end px-6">

        {/* PROGRESS BARS */}
        <div className="flex gap-2">
          {heroes.map((_, i) => (
            <div
              key={i}
              className="w-14 h-1 bg-white/30 rounded overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-200 ease-linear"
                style={{
                  width:
                    i < index
                      ? "100%"
                      : i === index
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* NAV BUTTONS */}
        <div className="absolute right-6 flex gap-2">

          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-xl border border-white/20 transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-xl border border-white/20 transition"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

    </section>
    )
}