import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, customSession } from "better-auth/plugins";


export const prisma = new PrismaClient
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    
  }),
  emailAndPassword:{
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 4
  },
  plugins:[
    admin(),
  ],
  user:{
    additionalFields:{
      active:{
        type:'boolean',
        input: false
      }
    }
  }
  
  
})