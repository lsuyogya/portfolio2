"use client";
import { Skill } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let activeCard: HTMLElement | null = null;
      let scrollComplete = false;

      const cards = gsap.utils.toArray(".card") as HTMLElement[];
      const wrapper = wrapperRef.current;
      let leaveTimeout: ReturnType<typeof setTimeout> | null = null;
      const leaveTimer = 150; // ms

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
      // CARD HELPERS
      // -----------------------------
      const getParts = (c: HTMLElement) => ({
        top: c.querySelector(".top"),
        right: c.querySelector(".right"),
        bottom: c.querySelector(".bottom"),
        left: c.querySelector(".left"),
      });

      const resetCard = (c: HTMLElement) => {
        const { top, right, bottom, left } = getParts(c);

        gsap.to(c, {
          scale: 1,
          opacity: 1,
          zIndex: 0,
          duration: 0.2,
          overwrite: "auto",
        });

        gsap.to(top, { left: 24, right: 24, duration: 0.2, overwrite: "auto" });
        gsap.to(bottom, {
          left: 24,
          right: 24,
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(left, {
          top: 24,
          bottom: 24,
          duration: 0.2,
          overwrite: "auto",
        });
        gsap.to(right, {
          top: 24,
          bottom: 24,
          duration: 0.2,
          overwrite: "auto",
        });
      };

      const activateCard = (c: HTMLElement) => {
        const { top, right, bottom, left } = getParts(c);

        gsap.to(c, {
          scale: 1.02,
          opacity: 1,
          zIndex: 10,
          duration: 0.2,
          overwrite: "auto",
        });

        gsap.to(top, {
          left: 36,
          right: 36,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(bottom, {
          left: 36,
          right: 36,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(left, {
          top: 36,
          bottom: 36,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(right, {
          top: 36,
          bottom: 36,
          duration: 0.25,
          overwrite: "auto",
        });
      };

      const dimCard = (c: HTMLElement) => {
        const { top, right, bottom, left } = getParts(c);

        gsap.to(c, {
          opacity: 0.4,
          scale: 0.98,
          duration: 0.2,
          overwrite: "auto",
        });

        gsap.to(top, { left: 0, right: 0, duration: 0.25, overwrite: "auto" });
        gsap.to(bottom, {
          left: 0,
          right: 0,
          duration: 0.25,
          overwrite: "auto",
        });
        gsap.to(left, { top: 0, bottom: 0, duration: 0.25, overwrite: "auto" });
        gsap.to(right, {
          top: 0,
          bottom: 0,
          duration: 0.25,
          overwrite: "auto",
        });
      };

      const resetAll = () => {
        cards.forEach(resetCard);
      };

      // -----------------------------
      // APPLY HOVER (STATE DIFF)
      // -----------------------------
      const applyHover = (card: HTMLElement) => {
        if (activeCard === card) return;

        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }

        const prev = activeCard;
        activeCard = card;

        // reset previous only
        if (prev) resetCard(prev);

        // activate current
        activateCard(card);

        // dim others
        cards.forEach((c) => {
          if (c !== card) dimCard(c);
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
          fastScrollEnd: true,
        },
        onComplete: () => {
          scrollComplete = true;

          requestAnimationFrame(() => {
            const el = document.elementFromPoint(
              mouseX,
              mouseY,
            ) as HTMLElement | null;
            const card = el?.closest?.(".card") as HTMLElement | null;

            if (card) applyHover(card);
            else {
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
          if (leaveTimeout) {
            clearTimeout(leaveTimeout);
            leaveTimeout = null;
          }
          applyHover(card);
        };

        const onLeave = () => {
          if (!scrollComplete) return;
          if (leaveTimeout) return;
          leaveTimeout = setTimeout(() => {
            activeCard = null;
            resetAll();
          }, leaveTimer);
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      let ticking = false;

      const syncHoverState = (e: MouseEvent) => {
        if (!scrollComplete) return;

        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          const el = document.elementFromPoint(
            e.clientX,
            e.clientY,
          ) as HTMLElement | null;
          const card = el?.closest?.(".card") as HTMLElement | null;

          if (!card) {
            if (activeCard && !leaveTimeout) {
              leaveTimeout = setTimeout(() => {
                activeCard = null;
                resetAll();
                leaveTimeout = null;
              }, leaveTimer);
            }
            return;
          } else if (card !== activeCard) {
            applyHover(card);
          }

          ticking = false;
        });
      };

      const wrapperMouseLeave = () => {
        if (leaveTimeout) return;

        leaveTimeout = setTimeout(() => {
          activeCard = null;
          resetAll();
          leaveTimeout = null;
        }, leaveTimer);
      };

      wrapper?.addEventListener("mousemove", syncHoverState);
      wrapper?.addEventListener("mouseleave", wrapperMouseLeave);

      // -----------------------------
      // CLEANUP
      // -----------------------------
      return () => {
        window.removeEventListener("mousemove", handleMouseMoveGlobal);
        wrapper?.removeEventListener("mousemove", syncHoverState);
        wrapper?.removeEventListener("mouseleave", wrapperMouseLeave);
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
