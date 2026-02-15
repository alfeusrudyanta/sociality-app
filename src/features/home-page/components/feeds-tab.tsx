import type { GetFeedResponse } from '../../../types/api-feeds';
import type {
  DefinedInfiniteQueryObserverResult,
  InfiniteData,
  InfiniteQueryObserverPlaceholderResult,
} from '@tanstack/react-query';
import { Card } from '../card';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../../components/shared/loading-spinner';

type FeedsTabProps = {
  feeds:
    | DefinedInfiniteQueryObserverResult<
        InfiniteData<GetFeedResponse, unknown>,
        Error
      >
    | InfiniteQueryObserverPlaceholderResult<
        InfiniteData<GetFeedResponse, unknown>,
        Error
      >;
};

export const FeedsTab: React.FC<FeedsTabProps> = ({ feeds }) => {
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && feeds.hasNextPage && !feeds.isFetchingNextPage) {
      feeds.fetchNextPage();
    }
  }, [
    inView,
    feeds.hasNextPage,
    feeds.isFetchingNextPage,
    feeds.fetchNextPage,
  ]);

  return (
    <div className='mx-auto flex w-full max-w-150 flex-col justify-center gap-4 md:gap-6'>
      {feeds.data?.pages.map((page, pageIndex) => {
        const items = page?.data?.items ?? [];

        return items.map((post, index) => {
          const isLastItem =
            pageIndex === feeds.data.pages.length - 1 &&
            index === page.data.items.length - 1;

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

      {feeds.isFetchingNextPage && (
        <div className='mt-10 flex w-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
