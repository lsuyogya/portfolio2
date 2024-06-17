"use client";
import Image from "next/image";
import "@/styles/page.scss";
import { Rubik_Moonrocks } from "next/font/google";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, createElement } from "react";

const pixel = Rubik_Moonrocks({ weight: "400", subsets: ["latin"] });
const pixelify = localFont({
  src: "../public/fonts/pixelify_sans/PixelifySans-VariableFont_wght.ttf",
});
export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleScroll() {
    const position = window.scrollY;
    setScrollPosition(position);
  }
  function handleWindowSize() {
    const height = window.innerHeight;
    setWindowHeight(height);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleWindowSize, { passive: true });
    handleWindowSize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleWindowSize);
    };
  }, []);

  const scrollBasedImgScale = scrollPosition / windowHeight;
  if (imgRef.current && scrollBasedImgScale) {
    imgRef.current.style.scale = `${scrollBasedImgScale * 10000}`;
    scrollBasedImgScale > 0
      ? (imgRef.current.style.scale = `${scrollBasedImgScale * 1000}`)
      : (imgRef.current.style.scale = `1`);
  }
  const chessColumns = 4;
  let chessBoardArray = [];
  for (let i = 1; i <= chessColumns; i++) {
    for (let j = 1; j <= chessColumns; j++) {
      const isDark = (i + j) % 2 === 1;
      chessBoardArray.push(
        <div
          key={`${i}-${j}`}
          data-row={i}
          data-column={j}
          className={isDark ? "dark" : "light"}
        ></div>
      );
    }
  }
  return (
    <main>
      <section className="grid place-content-center min-h-[120vh] overflow-hidden">
        <div className={`text-9xl ${pixel.className} `}>WELCOME</div>
        <div className={`text-2xl ${pixelify.className} text-center `}>
          Scroll down to know more about me
        </div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Image
            src={"/scroll-down-arrow.svg"}
            alt="scroll arrow"
            width={100}
            height={100}
            ref={imgRef}
            className="m-auto mt-4 scrollArrow"
          />
        </motion.div>
      </section>
      <section className="min-h-screen bg-dark grid place-content-center">
        <div
          className="chessboard"
          style={{ "--boardColumns": chessColumns } as React.CSSProperties}
        >
          {chessBoardArray}
        </div>
      </section>
    </main>
  );
}
