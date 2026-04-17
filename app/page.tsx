"use client";
import Image from "next/image";
import "@/styles/page.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef, useState } from "react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
const boardSections = [
  {
    id: "education",
    imgUrl: "icons/school-science-graduation-cap.svg",
    label: "Education",
    link: "/education",
  },
  {
    id: "work",
    imgUrl: "icons/consultancyContent.svg",
    label: "Work",
    link: "/work",
  },
  {
    id: "projects",
    imgUrl: "icons/coding-apps-websites-mobile.svg",
    label: "Projects",
    link: "/projects",
  },
  {
    id: "blog",
    imgUrl: "icons/content-files-write-note.svg",
    label: "Blog",
    link: "/blog",
  },
  {
    id: "Skillset",
    imgUrl: "icons/coding-apps-websites-programming-hold-code.svg",
    label: "Skillset",
    link: "/skillset",
  },
];

export default function Home() {
  const [menuTxt, setMenuTxt] = useState("Menu");
  const arrowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuTxtRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!arrowRef.current || !containerRef.current) return;

      // 🔁 Bounce animation for arrow
      const bounce = gsap.to(arrowRef.current, {
        y: 20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 📏 Scale arrow as we scroll
      const scaleArrowTween = gsap.fromTo(
        arrowRef.current,
        { scale: 1, translateX: "0" },
        {
          scale: 200, // adjust as needed
          translateX: "-100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current, // pin the whole section
            start: "top top", // start when section top hits viewport top
            end: "+=1000", // scroll distance
            scrub: 1,
            pin: true, // 🔥 pins the section
            anticipatePin: 1,
            onUpdate: (self) => {
              // self.progress is 0 → 1 over the scroll
              if (self.progress > 0.2) {
                bounce.pause(); // only pause once scroll starts changing scale
              } else {
                bounce.resume(); // resume bounce when at start
              }
            },
          },
        },
      );

      return () => {
        bounce.kill();
        scaleArrowTween.scrollTrigger?.kill();
        scaleArrowTween.kill();
      };
    },
    { scope: containerRef },
  );

  // 👇 runs every time `text` changes
  useGSAP(() => {
    if (!menuTxtRef.current) return;
    const scrambleTextTween = gsap.to(menuTxtRef.current, {
      duration: 1.4,
      scrambleText: {
        text: menuTxt,
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      ease: "power2.out",
    });
    return () => {
      scrambleTextTween.kill();
    };
  }, [menuTxt]); // 🔑 dependency triggers animation

  function* sectionGenerator(
    sections: { id: string; imgUrl: string; label: string; link: string }[],
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
          className={`${isDark ? "dark" : "light"} cell`}
        >
          {value ? (
            <Link href={value.link} className="w-full h-full block">
              <div
                className="imgWrapper"
                title={value.label}
                onMouseEnter={() => {
                  setTimeout(() => setMenuTxt(value.label), 100);
                }}
                onMouseLeave={() => {
                  setTimeout(() => setMenuTxt("Menu"), 50);
                }}
              >
                <Image
                  src={value.imgUrl}
                  height={200}
                  width={200}
                  alt={`${value.label} - icon`}
                  className="original"
                />
                <Image
                  src={value.imgUrl}
                  height={200}
                  width={200}
                  alt=""
                  aria-hidden="true"
                  className="reflection"
                />
              </div>
            </Link>
          ) : null}
        </div>,
      );
    }
  }
  return (
    <main>
      {/* Welcome Section */}
      <section
        className="grid place-content-center text-center min-h-[100vh] overflow-hidden"
        ref={containerRef}
      >
        <h1 className={`text-5xl md:text-9xl font-pixel `}>WELCOME</h1>
        <h2 className={`text-xl md:text-2xl font-pixelify text-center `}>
          Scroll down to know more about me
        </h2>
        <div ref={arrowRef}>
          <Image
            src={"/scroll-down-arrow.svg"}
            alt="scroll arrow"
            width={100}
            height={100}
            className="m-auto mt-4 scrollArrow"
          />
        </div>
      </section>

      {/* Menu Section */}
      <section className="min-h-screen bg-dark w-full">
        <div className="container grid place-content-center content-start mx-auto py-12">
          <div
            className={`header flex gap-[0.5ch] place-content-center text-3xl md:text-5xl text-white text-center`}
          >
            <h1 ref={menuTxtRef}>{menuTxt}</h1>
            <span className={"cursor"}>_</span>
          </div>
          <div
            className="chessboard"
            style={{ "--boardColumns": chessColumns } as React.CSSProperties}
          >
            <div className="contents">{chessBoardArray}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
