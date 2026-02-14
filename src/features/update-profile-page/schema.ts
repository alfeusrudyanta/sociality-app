import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const updateProfileSchema = z.object({
  name: z.string().min(3, { error: 'Name must be at least 3 characters' }),
  username: z
    .string()
    .regex(/^\S+$/, { error: 'Username cannot contain spaces' })
    .min(3, { error: 'Username must be at least 3 characters' }),
  phone: z
    .string()
    .min(10, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^\+?\d+$/, 'Phone number must contain only digits'),
  bio: z.string(),
  avatar: z
    .instanceof(File, { error: 'Please select an image' })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      error: 'Image size must be less than 5MB',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: 'Image must be JPG or PNG',
    }),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export { updateProfileSchema, type UpdateProfileData };
