import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === process.env.MY_PASSWORD) {
    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("auth", "true", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  }

  return NextResponse.json({ message: "Invalid password" }, { status: 401 });
}
