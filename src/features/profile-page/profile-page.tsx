import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { ProfileMenu } from '@/components/shared/profile-menu';
import { Section } from '@/components/shared/section';
import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import { useMe } from '@/hook/use-my-profile';
import { useUserProfile } from '@/hook/use-users';
import { cn } from '@/lib/utils';
import { Heart, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GalleryComponent } from './components/gallery-component';
import { LikedComponent } from './components/liked-component';

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const me = useMe();
  const user = useUserProfile(username!);
  const [isGallery, setIsGallery] = useState<boolean>(true);

  const initialLoad =
    (!me.data && me.isPending) || (!user.data && user.isPending);
  const error = (!me.data && me.isError) || (!user.data && user.isError);

  const isMe = me.data?.data.profile.username === user.data?.data.username;

  useEffect(() => {
    if (!initialLoad && !error && isMe) {
      navigate('/my-profile', { replace: true });
    }
  }, [isMe, initialLoad, error, navigate]);

  if (initialLoad) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Section>
      <div className='mx-auto flex w-full max-w-203 flex-col gap-4'>
        <ProfileMenu
          profile={user.data.data}
          counts={user.data.data.counts}
          isFollowing={user.data.data.isFollowing}
          isMe={false}
        />

        <Tabs defaultValue='gallery' className='mt-4'>
          <TabsList className='w-full bg-transparent'>
            <TabsTrigger
              onClick={() => setIsGallery(true)}
              value='gallery'
              className={cn(
                'text-sm-medium md:text-md-medium data-[state=active]:text-neutral-25 data-[state=active]:border-neutral-25 md:data-[state=active]:text-md-bold data-[state=active]:text-sm-bold mx-auto flex flex-1 items-center justify-center gap-2 rounded-none text-neutral-400 duration-75 data-[state=active]:border-b-2 data-[state=active]:bg-transparent'
              )}
            >
              <LayoutGrid
                className={cn(
                  'size-6 fill-neutral-400 stroke-neutral-400',
                  isGallery && 'fill-neutral-25 stroke-neutral-25'
                )}
              />
              Gallery
            </TabsTrigger>

            <TabsTrigger
              onClick={() => setIsGallery(false)}
              value='liked'
              className={cn(
                'text-sm-medium md:text-md-medium data-[state=active]:text-neutral-25 data-[state=active]:border-neutral-25 md:data-[state=active]:text-md-bold data-[state=active]:text-sm-bold mx-auto flex flex-1 items-center justify-center gap-2 rounded-none text-neutral-400 duration-75 data-[state=active]:border-b-2 data-[state=active]:bg-transparent'
              )}
            >
              <Heart
                className={cn(
                  'size-5 stroke-neutral-400',
                  !isGallery && 'fill-neutral-25 stroke-neutral-25'
                )}
              />
              Liked
            </TabsTrigger>
          </TabsList>

          <TabsContent value='gallery'>
            <GalleryComponent username={username!} />
          </TabsContent>

          <TabsContent value='liked'>
            <LikedComponent username={username!} />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};
