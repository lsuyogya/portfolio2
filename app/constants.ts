export const skills = [
  {
    category: "Frontend Frameworks & Libraries",
    items: ["React.js", "Next.js", "Vue.js", "Nuxt.js", "React Native"],
  },
  {
    category: "State Management & Data Fetching",
    items: ["Zustand", "Redux Toolkit", "TanStack Query", "Axios", "SWR"],
  },
  {
    category: "Routing",
    items: ["React Router", "Remix", "TanStack Router"],
  },
  {
    category: "Backend & Runtime",
    items: ["Node.js", "NestJS"],
  },
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python"],
  },
  {
    category: "Databases & Caching",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Styling & UI",
    items: [
      "Tailwind CSS",
      "Modern CSS (Flexbox, Grid, Responsive Design, CSS Variables, Container Queries, View Transitions, Subgrid, Logical Properties)",
      "SCSS",
    ],
  },
  {
    category: "Animation & Interaction",
    items: ["GSAP", "Framer Motion"],
  },
  {
    category: "CMS & E-commerce",
    items: ["Shopify", "WordPress", "Strapi"],
  },
  {
    category: "Data & Analytics",
    items: ["Data Visualization", "Data Analysis", "Data Cleaning"],
  },
  {
    category: "Data Engineering & Big Data",
    items: ["ETL", "Snowflake", "Nifi", "Hadoop", "Apache Spark"],
  },
  {
    category: "DevOps & Deployment",
    items: [
      "Linux",
      "Docker",
      "VPS Hosting",
      "Server Deployment (Nginx, Apache)",
    ],
  },
  {
    category: "Utilities",
    items: ["jsPDF"],
  },
];
export type Skill = (typeof skills)[number];

export const projects = [
  {
    title: "Grace Support Services",
    skills: ["Next.js", "Tailwind CSS"],
    url: "https://gracesupportservices.com.au",
    image: "https://placehold.co/600x400",
    alt: "Grace ss",
  },
  {
    title: "Aeroparts Solutions",
    skills: ["Next.js", "Tailwind CSS", "GSAP"],
    url: "https://aeroparts-solution.vercel.app/",
    image: "https://placehold.co/600x401",
    alt: "Aero ss",
  },
  {
    title: "URL Shortener",
    skills: ["Next.js", "Supabase", "OAuth"],
    url: "https://url-shortener-kappa-six.vercel.app/",
    image: "https://placehold.co/600x402",
    alt: "Shortener ss",
  },
];
export type Project = (typeof projects)[number];
