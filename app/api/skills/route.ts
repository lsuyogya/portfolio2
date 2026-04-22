export const dynamic = "force-static";
import { skills } from "@/app/constants";

export async function GET() {
  return Response.json(skills);
}
