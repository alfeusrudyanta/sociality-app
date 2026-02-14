import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ error: 'Please provide a valid email' }),
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export { loginSchema, type LoginFormData };
