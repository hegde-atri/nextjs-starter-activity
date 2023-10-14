import { z } from 'zod';

export const postSchema = z.object({
  title: z.string(),
  description: z.string().max(250),
});
