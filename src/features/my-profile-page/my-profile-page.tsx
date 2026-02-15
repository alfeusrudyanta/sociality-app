import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { ProfileMenu } from '@/components/shared/profile-menu';
import { Section } from '@/components/shared/section';
import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import { useMe } from '@/hook/use-my-profile';
import { cn } from '@/lib/utils';
import { Bookmark, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { GalleryComponent } from './components/gallery-component';
import { SavedComponent } from './components/saved-component';

export const MyProfilePage = () => {
  const { data, isPending, isError } = useMe();

  const [isGallery, setIsGallery] = useState<boolean>(true);

  if (!data && isPending) {
    return <LoadingPage />;
  }

  if (!data && isError) {
    return <ErrorPage />;
  }

  return (
    <Section>
      <div className='mx-auto flex w-full max-w-203 flex-col gap-4'>
        <ProfileMenu
          profile={data.data.profile}
          counts={data.data.stats}
          isMe={true}
          isFollowing={false}
        />

        <Tabs defaultValue='gallery' className='mt-4'>
          <TabsList className='w-full bg-transparent'>
            <TabsTrigger
              onClick={() => setIsGallery(true)}
              value='gallery'
              className={cn(
                'text-sm-medium md:text-md-medium data-[state=active]:text-neutral-25! data-[state=active]:border-neutral-25! md:data-[state=active]:text-md-bold data-[state=active]:text-sm-bold mx-auto flex w-full! flex-1 items-center justify-center gap-2 rounded-none text-neutral-400 duration-75 data-[state=active]:border-b-2 data-[state=active]:bg-transparent'
              )}
            >
              <LayoutGrid
                className={cn(
                  'size-5 fill-neutral-400 stroke-neutral-400',
                  isGallery && 'fill-neutral-25 stroke-neutral-25'
                )}
              />
              Gallery
            </TabsTrigger>

            <TabsTrigger
              onClick={() => setIsGallery(false)}
              value='saved'
              className={cn(
                'text-sm-medium md:text-md-medium data-[state=active]:text-neutral-25! data-[state=active]:border-neutral-25! md:data-[state=active]:text-md-bold data-[state=active]:text-sm-bold mx-auto flex w-full! flex-1 items-center justify-center gap-2 rounded-none text-neutral-400 duration-75 data-[state=active]:border-b-2 data-[state=active]:bg-transparent'
              )}
            >
              <Bookmark
                className={cn(
                  'size-5 stroke-neutral-400',
                  !isGallery && 'fill-neutral-25 stroke-neutral-25'
                )}
              />
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value='gallery' className='w-full'>
            <GalleryComponent />
          </TabsContent>

          <TabsContent value='saved' className='w-full'>
            <SavedComponent />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};
