import { ErrorPage } from '@/components/page/error-page';
import { LoadingPage } from '@/components/page/loading-page';
import { Section } from '@/components/shared/section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFeeds } from '@/hook/use-feeds';
import { usePosts } from '@/hook/use-posts';
import { FeedsTab } from './components/feeds-tab';
import { ExploreTab } from './components/explore-tab';

export const HomePage = () => {
  const feeds = useFeeds();
  const explore = usePosts();

  const initialLoad =
    (feeds.isPending && !feeds.data) || (explore.isPending && !explore.data);

  const isError =
    (feeds.isError && !feeds.data) || (explore.isError && !explore.data);

  if (initialLoad) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  const allFeeds = feeds.data?.pages.flatMap((page) => page.data.items) ?? [];
  const allPosts = explore.data?.pages.flatMap((page) => page.data.posts) ?? [];

  return (
    <Section>
      <div className='gap flex flex-col gap-4 md:gap-6'>
        <Tabs defaultValue='feeds'>
          <TabsList>
            <TabsTrigger value='feeds'>Feeds</TabsTrigger>
            <TabsTrigger value='explore'>Explore</TabsTrigger>
          </TabsList>

          <TabsContent value='feeds'>
            {allFeeds.length === 0 && (
              <div className='flex items-center justify-center pt-10'>
                <span className='text-md-bold md:text-xl-bold'>
                  Start by following other users!
                </span>
              </div>
            )}

            {allFeeds.length > 0 && <FeedsTab feeds={feeds} />}
          </TabsContent>

          <TabsContent value='explore'>
            {allPosts.length === 0 && (
              <div className='flex items-center justify-center pt-10'>
                <span className='text-md-bold md:text-xl-bold'>
                  Start by creating a new post!
                </span>
              </div>
            )}
            {allPosts.length === 0 && (
              <div className='flex items-center justify-center pt-10'>
                <span className='text-md-bold md:text-xl-bold'>
                  Be the first to post your moment!
                </span>
              </div>
            )}

            {allPosts.length > 0 && <ExploreTab explore={explore} />}
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
};
