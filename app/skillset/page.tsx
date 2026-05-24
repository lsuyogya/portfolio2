import { Skill } from "@/app/constants";
import { headers } from "next/headers";
import SkillsGrid from "./SkillsGrid";

export default async function SkillSetPage() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const skills: Skill[] = await fetch(`${baseUrl}/api/skills`).then((res) =>
    res.json(),
  );

  return (
    <div className="container mx-auto py-8 @container">
      <h1 className="font-pixelify text-5xl mb-8">Skillset</h1>
      <SkillsGrid skills={skills} />
    </div>
  );
}
