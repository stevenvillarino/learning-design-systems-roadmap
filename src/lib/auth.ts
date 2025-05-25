import { betterAuth } from "better-auth";

// Minimal generic config: in-memory storage, email/password auth enabled
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // In-memory storage for demo/dev only (not for production)
  database: {
    type: "memory",
  },
}); 