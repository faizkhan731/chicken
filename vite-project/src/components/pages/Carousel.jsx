import { useEffect, useState } from "react";
import slid1 from "/sld6.jpg";
import slid2 from "/sld7.jpg";
import slid3 from "/slid3.png";

const images = [
  { url: slid1, alt: "Fresh Chicken Legs" },
  { url: slid2, alt: "Grilled Chicken" },
  { url: slid3, alt: "Spicy Chicken Curry" },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
        {/* Maintain aspect ratio for responsiveness */}
        <div className="relative pt-[56.25%] sm:pt-[50%] md:pt-[40%] lg:pt-[35%]">
          <div
            className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={i} className="w-full flex-shrink-0 h-full">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  current === i ? "bg-red-600 scale-110" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
