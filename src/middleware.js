import { withAuth } from "next-auth/middleware";

export default withAuth(
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const method = req.method;
        const pathname = req.nextUrl.pathname;

        const isAdmin = token?.permissions === "admin";

        if (pathname.startsWith("/api/admin")) {
          return isAdmin && (method === "POST" || method === "PUT");
        }

        return isAdmin;
      },
    },
  },
  {
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
