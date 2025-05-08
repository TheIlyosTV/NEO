import { useState, useEffect } from "react";

export default function TextCarousel() {
  const texts = [
    {
      content: "Experience Shopping, the Neo Way",
      color: "from-blue-400 to-teal-400",
    },
    {
      content: "Xaridni Neo uslubida his eting",
      color: "from-green-400 to-yellow-400",
    },
    { content: "Ощутите стиль Нео при покупке", color: "from-red-400 to-pink-400" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 2000); // Har 2 soniyada o'zgaradi

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex justify-center items-center h-40 bg-gray-100 rounded-lg shadow-md">
      <div className="relative w-full h-full overflow-hidden">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${text.color}`}
            >
              {text.content}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
