import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const addPostSchema = z.object({
  caption: z
    .string()
    .min(8, { error: 'Caption must be at least 8 characters long' }),
  image: z
    .instanceof(File, { error: 'Please select an image' })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      error: 'Image size must be less than 5MB',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: 'Image must be JPG or PNG',
    }),
});

type AddPostSchema = z.infer<typeof addPostSchema>;

export { addPostSchema, type AddPostSchema };
