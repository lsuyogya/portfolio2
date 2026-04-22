"use client";
import { Skill } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  gsap.registerPlugin(ScrollTrigger);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let activeCard: HTMLElement | null = null;
      let scrollComplete = false;

      const cards = gsap.utils.toArray(".card") as HTMLElement[];
      const wrapper = wrapperRef.current;

      // -----------------------------
      // GLOBAL MOUSE POSITION
      // -----------------------------
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMoveGlobal = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      window.addEventListener("mousemove", handleMouseMoveGlobal);

      // -----------------------------
      // RESET
      // -----------------------------
      const resetAll = () => {
        gsap.killTweensOf(cards);

        cards.forEach((c) => {
          const top = c.querySelector(".top");
          const right = c.querySelector(".right");
          const bottom = c.querySelector(".bottom");
          const left = c.querySelector(".left");

          gsap.to(c, {
            scale: 1,
            opacity: 1,
            zIndex: 0,
            duration: 0.2,
          });

          gsap.to(top, { left: 24, right: 24, duration: 0.2 });
          gsap.to(bottom, { left: 24, right: 24, duration: 0.2 });
          gsap.to(left, { top: 24, bottom: 24, duration: 0.2 });
          gsap.to(right, { top: 24, bottom: 24, duration: 0.2 });
        });
      };

      // -----------------------------
      // APPLY HOVER
      // -----------------------------
      const applyHover = (card: HTMLElement) => {
        if (activeCard === card) return;

        activeCard = card;

        const siblings = cards.filter((c) => c !== card);

        const top = card.querySelector(".top");
        const right = card.querySelector(".right");
        const bottom = card.querySelector(".bottom");
        const left = card.querySelector(".left");

        gsap.killTweensOf(cards);
        resetAll();

        gsap.to(card, {
          scale: 1.03,
          opacity: 1,
          zIndex: 10,
          duration: 0.2,
        });

        gsap.to(top, { left: 36, right: 36, duration: 0.25 });
        gsap.to(bottom, { left: 36, right: 36, duration: 0.25 });
        gsap.to(left, { top: 36, bottom: 36, duration: 0.25 });
        gsap.to(right, { top: 36, bottom: 36, duration: 0.25 });

        siblings.forEach((sib) => {
          const sibTop = sib.querySelector(".top");
          const sibRight = sib.querySelector(".right");
          const sibBottom = sib.querySelector(".bottom");
          const sibLeft = sib.querySelector(".left");

          gsap.to(sib, {
            opacity: 0.4,
            scale: 0.98,
            duration: 0.2,
          });

          gsap.to(sibTop, { left: 0, right: 0, duration: 0.25 });
          gsap.to(sibRight, { top: 0, bottom: 0, duration: 0.25 });
          gsap.to(sibBottom, { left: 0, right: 0, duration: 0.25 });
          gsap.to(sibLeft, { top: 0, bottom: 0, duration: 0.25 });
        });
      };

      // -----------------------------
      // INITIAL STATE
      // -----------------------------
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 40 });

        gsap.set(card.querySelectorAll("h2, ul, li"), {
          opacity: 0,
          y: 15,
        });

        gsap.set(card.querySelector(".top"), {
          scaleX: 0,
          transformOrigin: "left",
        });

        gsap.set(card.querySelector(".right"), {
          scaleY: 0,
          transformOrigin: "top",
        });

        gsap.set(card.querySelector(".bottom"), {
          scaleX: 0,
          transformOrigin: "right",
        });

        gsap.set(card.querySelector(".left"), {
          scaleY: 0,
          transformOrigin: "bottom",
        });
      });

      // -----------------------------
      // SCROLL ANIMATION
      // -----------------------------
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 50%",
        },
        onComplete: () => {
          scrollComplete = true;

          // 🔥 FIX: sync hover immediately after scroll
          requestAnimationFrame(() => {
            const el = document.elementFromPoint(
              mouseX,
              mouseY,
            ) as HTMLElement | null;

            const card = el?.closest?.(".card") as HTMLElement | null;

            if (card) {
              applyHover(card);
            } else {
              activeCard = null;
              resetAll();
            }
          });
        },
      });

      cards.forEach((card, i) => {
        const top = card.querySelector(".top");
        const right = card.querySelector(".right");
        const bottom = card.querySelector(".bottom");
        const left = card.querySelector(".left");
        const content = card.querySelectorAll("h2, ul, li");

        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        })
          .to(top, { scaleX: 1, duration: 0.25 })
          .to(right, { scaleY: 1, duration: 0.25 })
          .to(bottom, { scaleX: 1, duration: 0.25 })
          .to(left, { scaleY: 1, duration: 0.25 })
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              stagger: 0.05,
            },
            "-=0.1",
          );

        master.add(tl, i * 0.15);
      });

      // -----------------------------
      // EVENTS
      // -----------------------------
      const cleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const onEnter = () => {
          if (!scrollComplete) return;
          applyHover(card);
        };

        const onLeave = () => {
          if (!scrollComplete) return;
          activeCard = null;
          resetAll();
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      const syncHoverState = (e: MouseEvent) => {
        if (!scrollComplete) return;

        const el = document.elementFromPoint(
          e.clientX,
          e.clientY,
        ) as HTMLElement | null;

        const card = el?.closest?.(".card") as HTMLElement | null;

        if (!card) {
          if (activeCard) {
            activeCard = null;
            resetAll();
          }
          return;
        }

        if (card !== activeCard) {
          applyHover(card);
        }
      };

      wrapper?.addEventListener("mousemove", syncHoverState);

      // -----------------------------
      // CLEANUP
      // -----------------------------
      return () => {
        window.removeEventListener("mousemove", handleMouseMoveGlobal);
        wrapper?.removeEventListener("mousemove", syncHoverState);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div
      className="skillsCardWrapper grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-8 "
      ref={wrapperRef}
    >
      {skills.map((skill) => (
        <div
          key={skill.category}
          className="card grid row-span-2 gap-0 grid-rows-subgrid relative p-7 grouppp"
        >
          <span className="top absolute top-0 left-6 right-6  h-[3px] bg-black transition-alla "></span>
          <span className="bottom absolute bottom-0 left-6 right-6  h-[3px] bg-black transition-alla "></span>
          <span className="left absolute left-0 top-6 bottom-6  w-[3px] bg-black transition-alla "></span>
          <span className="right absolute right-0 top-6 bottom-6  w-[3px] bg-black transition-alla "></span>
          <h2 className="text-3xl mb-4 font-semibold">{skill.category}</h2>
          <ul className="list-disc mx-4">
            {skill.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
