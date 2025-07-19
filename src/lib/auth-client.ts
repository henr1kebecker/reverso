import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.PUBLIC_AUTH_URL,
  
  plugins: [
    adminClient()
  ]
})