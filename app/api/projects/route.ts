export const dynamic = "force-static";
import { projects } from "@/app/constants";

export async function GET() {
  return Response.json(projects);
}
