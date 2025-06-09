import { betterAuth } from "better-auth";

// Development config with better error handling
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  // Use a more stable SQLite database for development
  database: {
    type: "sqlite",
    url: ":memory:",
  },
  // Add better error handling
  advanced: {
    generateId: () => crypto.randomUUID(),
  },
}); 