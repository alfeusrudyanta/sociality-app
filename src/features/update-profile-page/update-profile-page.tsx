import { Section } from '../../components/shared/section';
import { MobileMenu } from './components/mobile-menu';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMe, usePatchMe } from '../../hook/use-my-profile';
import { ErrorPage } from '../../components/page/error-page';
import { LoadingPage } from '../../components/page/loading-page';
import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '../../components/shared/loading-spinner';
import { FormLabel } from '../../components/shared/form-label';
import type { UpdateProfileFormErrors } from './types';
import { updateProfileSchema } from './schema';

export const UpdateProfilePage = () => {
  const me = useMe();
  const patch = usePatchMe();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<UpdateProfileFormErrors>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialLoad = !me.data && me.isPending;

  useEffect(() => {
    if (!me.data?.data.profile) return;

    setName(me.data.data.profile.name);
    setUsername(me.data.data.profile.username);
    setPhone(me.data.data.profile.phone);
    setBio(me.data.data.profile.bio || '');
    setAvatarPreview(
      me.data.data.profile.avatarUrl || '/images/profile-picture.png'
    );
  }, [me.data]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  if (initialLoad) {
    return <LoadingPage />;
  }

  if (me.isError) {
    return <ErrorPage />;
  }

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
    setAvatar(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFile(file);
  };

  const handleFile = (file: File) => {
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setAvatar(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    setError({});

    const result = updateProfileSchema.safeParse({
      name,
      username,
      phone,
      bio,
      avatar,
    });

    if (!result.success) {
      const newError: UpdateProfileFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof UpdateProfileFormErrors;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    /* Mutate */
    patch.mutate(result.data);
  };

  return (
    <Section>
      {/* Mobile Menu */}
      <MobileMenu data={me.data} />

      <div className='mx-auto flex w-full max-w-200 flex-col gap-8'>
        {/* Desktop Menu */}
        <Link
          to={`/profile/${me.data.data.profile?.username}`}
          className='hidden cursor-pointer items-center gap-3 md:flex'
        >
          <ArrowLeft className='size-8' />
          <span className='display-xs-bold'>Edit Profile</span>
        </Link>

        <div className='flex flex-col items-center justify-center gap-4 md:flex-row md:items-start md:justify-start md:gap-12'>
          {/* Profile Section */}
          <div
            className='relative flex flex-col items-center justify-center gap-4'
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={handleDrop}
          >
            <div className='size-20 cursor-pointer overflow-hidden rounded-full md:size-32.5'>
              <input
                ref={fileInputRef}
                id='image'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                disabled={patch.isPending}
                className='absolute inset-0 -z-10 h-full w-full cursor-pointer opacity-0'
              />

              <img
                onClick={handleTriggerFileInput}
                src={avatarPreview || '/images/profile-picture.png'}
                alt={me.data.data.profile.name}
                className='size-full'
              />
            </div>

            {error.avatar && (
              <span className='text-sm-medium md:text-sm-medium text-accent-red text-start tracking-[-0.03em]'>
                {error.avatar}
              </span>
            )}

            <Button
              onClick={handleTriggerFileInput}
              variant='transparant'
              className='w-40'
              disabled={patch.isPending}
            >
              Change Photo
            </Button>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSave}
            className='flex w-full flex-col items-center gap-4 md:gap-6'
          >
            <FormLabel
              name='Name'
              id='name'
              type='text'
              placeholder='Enter your email'
              value={name}
              disabled={patch.isPending}
              onChange={setName}
              error={error.name}
            />

            <FormLabel
              name='Username'
              id='username'
              type='text'
              placeholder='Enter your username'
              value={username}
              disabled={patch.isPending}
              onChange={setUsername}
              error={error.username}
            />

            <FormLabel
              name='Phone Number'
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
              value={phone}
              disabled={patch.isPending}
              onChange={setPhone}
              error={error.phone}
            />

            <FormLabel
              name='Bio'
              id='bio'
              type='text'
              placeholder='Enter your bio'
              value={bio}
              disabled={patch.isPending}
              onChange={setBio}
              error={error.bio}
            />

            <Button type='submit' disabled={patch.isPending}>
              {patch.isPending ? <LoadingSpinner /> : 'Save Changes'}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};
