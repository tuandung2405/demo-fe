import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyToken(token: string): Promise<boolean> {
  try {
    // const response = await fetch('/api/verify-token', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token }),
    // });

    const response = await Promise.resolve({
      ok: !!token,
      json: () => Promise.resolve({ isValid: !!token }),
    });

    if (!response.ok) {
      throw new Error("Token verification failed");
    }

    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  try {
    console.log("Middleware executing for path:", request.nextUrl.pathname);

    const token = request.cookies.get("token")?.value;
    console.log("Middleware token:", token);

    // Exclude login page from token check
    if (request.nextUrl.pathname === "/authentication/login") {
      // Verify the token
      const isValidToken = await verifyToken(token || "");
      console.log("isValidToken:", isValidToken);
      if (isValidToken) {
        return NextResponse.redirect(
          new URL("/", request.url)
        );
      } else {
        return NextResponse.next();
      }
    }

    if (!token) {
      console.log("No token found, redirecting to /authentication/login");
      return NextResponse.redirect(
        new URL("/authentication/login", request.url)
      );
    }

    // Verify the token
    const isValidToken = await verifyToken(token);
    if (!isValidToken) {
      console.log("Invalid token, redirecting to /authentication/login");
      return NextResponse.redirect(
        new URL("/authentication/login", request.url)
      );
    }

    console.log("Token verified, allowing access");
    console.log("Middleware completed");
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

console.log("middleware embedding");

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images/*).*)",
    "/authentication/login"
  ],
};
