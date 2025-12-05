import { z } from "zod";

export const googleOAuthCallbackSchema = z
  .object({
    state: z.string(),
    code: z.string(),
    scope: z.string()
  })
export type googleOAuthCallbackDto = z
  .infer<typeof googleOAuthCallbackSchema>

