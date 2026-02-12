for image input:

<input
  type="file"
  accept="image/png,image/jpeg,image/webp"
/>

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export function validateAvatar(file: File) {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("Only PNG, JPG, or WEBP images are allowed");
  }

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 2MB");
  }
}

Noted:
add profile in redux  => set on header
add toaster on hooks