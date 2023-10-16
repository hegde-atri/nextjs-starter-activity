import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(2),
  description: z.string().max(250).min(1),
});
