export default async function SkillSetPage() {
  const skills = [
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
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-pixelify text-5xl mb-8">Skillset</h1>
      <div
        className="cardWrapper @container grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-8 
          [&:has(.card:hover)_.card:not(:hover)_.top]:left-0!
          [&:has(.card:hover)_.card:not(:hover)_.top]:right-0!
          [&:has(.card:hover)_.card:not(:hover)_.bottom]:left-0!
          [&:has(.card:hover)_.card:not(:hover)_.bottom]:right-0!
          [&:has(.card:hover)_.card:not(:hover)_.left]:top-0!
          [&:has(.card:hover)_.card:not(:hover)_.left]:bottom-0!
          [&:has(.card:hover)_.card:not(:hover)_.right]:top-0!
          [&:has(.card:hover)_.card:not(:hover)_.right]:bottom-0!
    "
      >
        {skills.map((skill) => (
          <div key={skill.category} className="card relative p-7 group">
            <span className="top absolute top-0 left-6 right-6 group-hover:left-9 group-hover:right-9  h-[3px] bg-black transition-all "></span>
            <span className="bottom absolute bottom-0 left-6 right-6 group-hover:right-9 group-hover:left-9  h-[3px] bg-black transition-all "></span>
            <span className="left absolute left-0 top-6 bottom-6 group-hover:top-9 group-hover:bottom-9  w-[3px] bg-black transition-all "></span>
            <span className="right absolute right-0 top-6 bottom-6 group-hover:bottom-9 group-hover:top-9  w-[3px] bg-black transition-all "></span>
            <h2 className="text-3xl mb-4 font-semibold">{skill.category}</h2>
            <ul className="list-disc mx-4">
              {skill.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
