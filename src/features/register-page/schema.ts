import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, { error: 'Name must be at least 3 characters' }),
  username: z
    .string()
    .min(3, { error: 'Username must be at least 3 characters' })
    .regex(/^\S+$/, { error: 'Username cannot contain spaces' }),
  email: z.email({ error: 'Please provide a valid email' }),
  phone: z
    .string()
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\+?\d+$/, 'Phone number must contain only digits'),
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterFormData };
