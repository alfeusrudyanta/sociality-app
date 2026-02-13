import type { GetPostsResponse } from '@/types/api-posts';
import type {
  DefinedInfiniteQueryObserverResult,
  InfiniteData,
  InfiniteQueryObserverPlaceholderResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card } from '../card';
import { LoadingSpinner } from '@/components/shared/loading-spinner';

type ExploreTabProps = {
  explore:
    | DefinedInfiniteQueryObserverResult<
        InfiniteData<GetPostsResponse, unknown>,
        Error
      >
    | InfiniteQueryObserverPlaceholderResult<
        InfiniteData<GetPostsResponse, unknown>,
        Error
      >;
};

export const ExploreTab: React.FC<ExploreTabProps> = ({ explore }) => {
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && explore.hasNextPage && !explore.isFetchingNextPage) {
      explore.fetchNextPage();
    }
  }, [
    inView,
    explore.hasNextPage,
    explore.isFetchingNextPage,
    explore.fetchNextPage,
  ]);

  return (
    <div className='mx-auto flex w-full max-w-150 flex-col justify-center gap-4 md:gap-6'>
      {explore.data?.pages.map((page, pageIndex) => {
        const items = page?.data?.posts ?? [];

        return items.map((post, index) => {
          const isLastItem =
            pageIndex === explore.data.pages.length - 1 &&
            index === page.data.posts.length - 1;

          return (
            <div key={post.id} className='flex flex-col gap-4 md:gap-6'>
              <Card post={post} />

              {!isLastItem && (
                <div className='w-full border border-neutral-900' />
              )}
            </div>
          );
        });
      })}

      <div ref={ref} />

      {explore.isFetchingNextPage && (
        <div className='mt-10 flex w-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
