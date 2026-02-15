import { usePostPost } from '../../hook/use-posts';
import { useRef, useState } from 'react';
import type { AddPostError } from './type';
import { addPostSchema } from './schema';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpToLine, CloudUpload, Trash } from 'lucide-react';
import { MobileMenu } from './components/mobile-menu';
import { Section } from '../../components/shared/section';
import { Button } from '../../components/ui/button';
import { LoadingSpinner } from '../../components/shared/loading-spinner';

export const AddPostPage = () => {
  const { mutate, isPending } = usePostPost();

  const [imageFile, setImageFile] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [error, setError] = useState<AddPostError>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setImageFile(URL.createObjectURL(file));
    setImage(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFile(file);
  };

  const handleFile = (file: File) => {
    setImageFile((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setImage(file);
  };

  const handleRemoveImage = () => {
    if (imageFile) URL.revokeObjectURL(imageFile);

    setImageFile(null);
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleAddPost = () => {
    setError({});

    const result = addPostSchema.safeParse({
      caption: caption.trim(),
      image,
    });

    if (!result.success) {
      const newError: AddPostError = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof AddPostError;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    mutate(result.data);
  };

  return (
    <div className='relative'>
      {/* Mobile Menu */}
      <MobileMenu />

      <Section>
        <div className='mx-auto flex w-full max-w-113 flex-col gap-6'>
          {/* Desktop Menu */}
          <Link
            to='/'
            className='hidden cursor-pointer items-center gap-3 md:flex'
          >
            <ArrowLeft className='size-8' />
            <span className='display-xs-bold'>Add Post</span>
          </Link>

          {/* Content */}
          <div className='flex flex-col gap-1.5'>
            <div className='flex flex-col gap-0.5'>
              <span className='text-sm-bold md:text-sm-bold tracking-[-0.02em]'>
                Photo
              </span>

              {/*  Image */}
              {!imageFile && (
                <div
                  className='relative flex flex-col items-center gap-3 rounded-xl border border-dashed border-neutral-900 bg-neutral-950 px-6 py-4'
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    id='image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    disabled={isPending}
                    className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'
                  />

                  <div className='flex flex-col items-center justify-center gap-3'>
                    <Button
                      variant='transparant'
                      size='button'
                      className='size-10 rounded-md'
                    >
                      <CloudUpload className='size-5' />
                    </Button>

                    <div className='flex flex-col gap-1'>
                      <span className='text-sm-semibold md:text-sm-semibold text-center tracking-[-0.02em] text-neutral-600'>
                        <span className='text-primary-200 text-sm-bold md:text-sm-bold'>
                          Click or drag
                        </span>{' '}
                        to upload an image
                      </span>

                      <span className='text-sm-semibold md:text-sm-semibold text-center tracking-[-0.02em] text-neutral-600'>
                        PNG or JPG (max. 5mb)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {imageFile && (
                <div className='relative flex flex-col items-center gap-4 rounded-xl border border-neutral-900 bg-neutral-950 px-6 py-4'>
                  <input
                    ref={fileInputRef}
                    id='image'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    disabled={isPending}
                    className='absolute inset-0 -z-10 h-full w-full cursor-pointer opacity-0'
                  />

                  <div className='flex flex-col gap-3'>
                    <div className='mx-auto aspect-square overflow-hidden'>
                      <img
                        onClick={handleTriggerFileInput}
                        src={imageFile}
                        alt='Image Preview'
                        className='h-full w-full cursor-pointer object-cover object-center'
                      />
                    </div>

                    <div className='flex items-center justify-center gap-3'>
                      <Button
                        type='button'
                        variant='gray'
                        size='button'
                        disabled={isPending}
                        onClick={handleTriggerFileInput}
                        className='max-w-35.75'
                      >
                        <ArrowUpToLine className='size-5' />
                        Change&nbsp;Image
                      </Button>

                      <Button
                        type='button'
                        variant='gray'
                        size='button'
                        disabled={isPending}
                        onClick={handleRemoveImage}
                        className='text-accent-red max-w-35.75'
                      >
                        <Trash className='size-5' />
                        Delete&nbsp;Image
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error.image && (
              <span className='text-sm-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
                {error.image}
              </span>
            )}
          </div>

          {/* Caption */}
          <div className='flex flex-col gap-0.5'>
            <span className='text-sm-bold md:text-sm-bold tracking-[-0.02em]'>
              Caption
            </span>

            <div className='flex flex-col gap-0.5'>
              <textarea
                required
                value={caption}
                placeholder='Enter your caption'
                onChange={(e) => setCaption(e.currentTarget.value)}
                disabled={isPending}
                className='md:text-sm-regular h-50 rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-2'
              />
            </div>

            {error.caption && (
              <span className='text-sm-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
                {error.caption}
              </span>
            )}
          </div>

          {/* Button */}
          <Button disabled={isPending} onClick={handleAddPost} type='button'>
            {isPending ? <LoadingSpinner /> : 'Share'}
          </Button>
        </div>
      </Section>
    </div>
  );
};
