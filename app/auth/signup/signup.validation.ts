"use client"

import { z } from "zod"

export const signUpSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(255),
  "re_password": z.string().min(8).max(255),
})
