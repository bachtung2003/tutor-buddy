import { NextResponse } from "next/server";

export default function middleware(req: any) {
  let verify = req.cookies.get("accessToken");
  let url = req.url;

  if (!verify && url.includes("/dashboard")) {
    return NextResponse.redirect("http://localhost:3000/login");
  } else if (
    verify &&
    url === "http://localhost:3000/" &&
    url === "http://localhost:3000/login"
  ) {
    return NextResponse.redirect("http://localhost:3000/dashboard");
  }
}
