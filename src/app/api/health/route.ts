import { connection } from "next/server";

export async function GET() {
  await connection();

  return Response.json(
    {
      status: "ok",
      uptimeSec: Math.round(process.uptime()),
      commit: (process.env.RENDER_GIT_COMMIT ?? "dev").slice(0, 7),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}