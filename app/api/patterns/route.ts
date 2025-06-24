import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPatterns, addPattern, Pattern } from "@/lib/db";

export async function GET() {
  // Check for auth cookie
  const cookieStore = cookies();
  if ((await cookieStore).get("auth")?.value !== "true") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const patterns = getPatterns();
  return NextResponse.json(patterns);
}

export async function POST(request: Request) {
  // Check for auth cookie
  const cookieStore = cookies();
  if ((await cookieStore).get("auth")?.value !== "true") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();

  // Expected data structure: { title, imageUrl, link, content, pdfUrl, category, labels }
  const newPattern: Omit<Pattern, "id"> = {
    title: data.title,
    imageUrl: data.imageUrl,
    link: data.link,
    content: data.content,
    pdfUrl: data.pdfUrl,
    category: data.category,
    labels: data.labels,
  };

  const created = addPattern(newPattern);
  return NextResponse.json(created, { status: 201 });
}
