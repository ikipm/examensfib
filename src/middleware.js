// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    // This callback runs on every matched request. 
    // It checks if the token contains admin permissions.
    callbacks: {
      authorized: ({ token }) => token?.permissions === "admin",
    },
  },
  {
    // Optional: specify custom sign-in or error pages.
    pages: {
      signIn: "/auth/signin",   // Redirect non-authenticated users here.
      error: "/auth/error",     // Optional error page.
    },
  }
);

// Define which paths this middleware should protect.
export const config = {
  matcher: ["/admin/:path*"], 
  // Adjust the matcher to cover all admin-only routes, 
  // e.g., pages under '/admin/' or any other pattern.
};
