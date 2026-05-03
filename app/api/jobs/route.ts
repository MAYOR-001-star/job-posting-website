import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();
  // console.log(session)
  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  try {
    const data = await request.json();
    const job = await prisma.job.create({
      data: {
        ...data,
        postedById: session.user.id,
      },
    });
    return NextResponse.json(job);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { postedAt: "desc" },
      include: {
        postedBy: true
      }
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get jobs" }, { status: 500 });
  }
}
