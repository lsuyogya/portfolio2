'use client';
import Image from 'next/image';
import '@/styles/page.scss';
import { Rubik_Moonrocks } from 'next/font/google';
import localFont from 'next/font/local';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, createElement, useCallback } from 'react';

const pixel = Rubik_Moonrocks({ weight: '400', subsets: ['latin'] });
const pixelify = localFont({
  src: '../public/fonts/pixelify_sans/PixelifySans-VariableFont_wght.ttf',
});

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollPosition(position);
  }, []);
  const handleWindowSize = useCallback(() => {
    const height = window.innerHeight;
    setWindowHeight(height);
  }, []);
  useEffect(() => {
    // const debouncedScroll = debounce(handleScroll, 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    // window.addEventListener('scroll', debouncedScroll, { passive: true });
    window.addEventListener('resize', handleWindowSize, { passive: true });
    handleWindowSize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      // window.removeEventListener('scroll', debouncedScroll);
      window.addEventListener('resize', handleWindowSize);
    };
  }, [handleScroll, handleWindowSize]);

  const boardSections = [
    {
      id: 'education',
      imgUrl: 'icons/school-science-graduation-cap.svg',
      label: 'Education',
    },
    {
      id: 'work',
      imgUrl: 'icons/consultancyContent.svg',
      label: 'Work',
    },
    {
      id: 'projects',
      imgUrl: 'icons/coding-apps-websites-mobile.svg',
      label: 'Projects',
    },
    {
      id: 'blog',
      imgUrl: 'icons/content-files-write-note.svg',
      label: 'Blog',
    },
    {
      id: 'Skillset',
      imgUrl: 'icons/coding-apps-websites-programming-hold-code.svg',
      label: 'Blog',
    },
  ];
  function* sectionGenerator(
    sections: { id: string; imgUrl: string; label: string }[]
  ) {
    for (let section of sections) {
      yield section;
    }
  }
  // Using the generator
  const generator = sectionGenerator(boardSections);

  const chessColumns = 3;
  let chessBoardArray = [];
  for (let i = 1; i <= chessColumns; i++) {
    for (let j = 1; j <= chessColumns; j++) {
      const isDark = (i + j) % 2 === 1;
      let value = null;
      if (!isDark) {
        value = generator.next().value;
      }
      chessBoardArray.push(
        <div
          key={`${i}-${j}`}
          data-row={i}
          data-column={j}
          className={`${isDark ? 'dark' : 'light'} cell`}>
          {value ? (
            <div className="imgWrapper">
              <Image
                src={value.imgUrl}
                height={200}
                width={200}
                alt=""
                className="original"
              />
              <Image
                src={value.imgUrl}
                height={200}
                width={200}
                alt=""
                className="reflection"
              />
            </div>
          ) : null}
        </div>
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
          transition={{ repeat: Infinity, duration: 2 }}>
          <Image
            src={'/scroll-down-arrow.svg'}
            alt="scroll arrow"
            width={100}
            height={100}
            ref={imgRef}
            style={{
              scale: Math.max(scrollPosition / windowHeight, 0.001) * 1000 ?? 1,
            }}
            className="m-auto mt-4 scrollArrow"
          />
        </motion.div>
      </section>
      <section className="min-h-screen bg-dark grid place-content-center content-start">
        <div
          className="chessboard"
          style={{ '--boardColumns': chessColumns } as React.CSSProperties}>
          <div className="contents">{chessBoardArray}</div>
        </div>
      </section>
    </main>
  );
}
