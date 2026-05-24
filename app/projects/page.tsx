import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { headers } from "next/headers";
import { Project } from "../constants";
import ProjectsGrid from "./projectsGrid";

gsap.registerPlugin(ScrollTrigger);

export default async function ProjectPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");
  const baseUrl = `${protocol}://${host}`;

  const projects: Project[] = await fetch(`${baseUrl}/api/projects`).then(
    (res) => res.json(),
  );
  console.log(projects);
  return <ProjectsGrid projects={projects} />;
}
