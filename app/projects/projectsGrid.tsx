"use client";
import React from "react";
import { Project } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const images = projects.map((project) => project.image);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cardWrapper = containerRef.current.querySelector(
        ".projectsWrapper",
      ) as HTMLElement;
      const cards = containerRef.current.querySelectorAll(
        ".project-card",
      ) as NodeListOf<HTMLElement>;
      const totalScrollWidth =
        cardWrapper.scrollWidth - cardWrapper.clientWidth;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      tl.to(
        cardWrapper,
        {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          duration: 1,
        },
        0,
      );

      gsap.to(cards[0], { "--scaleLeft": 1, "--scaleRight": 0, duration: 0.9 });
      const step = 1 / (cards.length - 1);

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to(card, { "--scaleRight": 1, duration: step / 2 }, 0);
          return;
        }

        const base = (i - 1) * step + step / 2;

        // LEFT
        tl.fromTo(
          card,
          { "--scaleLeft": 0 },
          { "--scaleLeft": 1, duration: step / 2 },
          base,
        );

        // RIGHT (continues immediately)
        tl.fromTo(
          card,
          { "--scaleRight": 0 },
          { "--scaleRight": 1, duration: step / 2 },
          base + step / 2,
        );
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: true,
        invalidateOnRefresh: true,
        id: "projectsScroll",
        animation: tl,
        // snap: {
        //   snapTo: 1 / (cards.length - 1),
        //   duration: 1,
        //   ease: "power1.inOut",
        // },
        onUpdate: (self) => {
          console.log("Scroll Progress:", self.progress);
          console.log("ScrollPosition:", self.scroll());
          console.log("ScrollEnd:", self.end);

          imgRef.current?.setAttribute(
            "src",
            images[Math.round(self.progress / step)],
          );
        },
      });
    },
    { scope: containerRef },
  );
  return (
    <>
      <div className="container mx-auto px-4 min-h-screen" ref={containerRef}>
        <h1>Projects</h1>
        <p>This is the projects page.</p>
        <img src="https://placehold.co/600x400" alt="" ref={imgRef} />
        <div className="overflow-clip">
          <div className="projectsWrapper flex @container">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card-wrapper min-w-[100cqi] relative"
              >
                <div
                  className="project-card mx-auto  border-4 border-t-0 border-b-0 max-w-max bg-white
                before:absolute before:w-[50%] before:h-1 before:bg-black before:inset-0 before:my-auto before:-z-1
                after:absolute after:w-[50%] after:h-1 after:bg-black after:inset-0 after:my-auto after:ml-auto after:-z-1"
                >
                  <div className="relative p-4">
                    <div
                      className="borders 
                    before:absolute before:w-full before:h-1 before:bg-black before:inset-0 before:mb-auto
                    after:absolute after:w-full after:h-1 after:bg-black after:inset-0 after:mt-auto
                    "
                    ></div>
                    <h2>{project.title}</h2>
                    <p>{project.skills}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen"></div> */}
    </>
  );
};

export default ProjectsGrid;
