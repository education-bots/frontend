"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Class5AI() {
  // ✅ Slider images
  const slides = [
    { src: "/images/my2.jpg", alt: "Math" },
    { src: "/images/my3.jpg", alt: "Science" },
    { src: "/images/my4.jpg", alt: "English" },
    { src: "/images/my5.jpg", alt: "Urdu" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 via-pink-100 to-yellow-100 px-4 sm:px-6 py-[60px]">
      {/* Heading */}
      <p
        className="text-3xl sm:text-4xl font-extrabold 
        bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 
        bg-clip-text text-transparent drop-shadow-lg text-center mb-10"
      >
        📚 Class 5 — Explore & Learn ✨
      </p>

      {/* Slider */}
      <div className="w-full max-w-3xl mb-10">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-2xl shadow-lg"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-52 sm:h-64 md:h-72">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Buttons */}
      <div className="flex gap-6">
        <Link href="/chat">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition">
            Start Chat 💬
          </button>
        </Link>
        <Link href="/books">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition">
            View Books 📖
          </button>
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Made for Class 5 • Interactive Learning</p>
      </div>
    </div>
  );
}
