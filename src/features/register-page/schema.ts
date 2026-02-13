import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .regex(/^\S+$/, { message: 'Username cannot contain spaces' }),
  email: z.email({ message: 'Please provide a valid email' }),
  phone: z
    .string()
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\+?\d+$/, 'Phone number must contain only digits'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export { registerSchema, type RegisterFormData };
