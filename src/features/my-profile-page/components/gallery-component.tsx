import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '../../../components/shared/loading-spinner';
import { ProfilePostItem } from '../../../components/shared/profile-post-item';
import { useMePosts } from '../../../hook/use-my-profile';
import { useEffect } from 'react';

export const GalleryComponent = () => {
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useMePosts();
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.data.items) ?? [];

  if (isPending) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='flex h-40 flex-col items-center justify-center text-center'>
        <span className='text-md-bold md:text-lg-bold'>No posts yet</span>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 gap-1'>
      {data?.pages.map((page) =>
        page.data.items.map((post) => (
          <ProfilePostItem
            key={post.id}
            id={post.id}
            imageUrl={post.imageUrl}
          />
        ))
      )}

      <div ref={ref} />

      {isFetchingNextPage && (
        <div className='col-span-3 flex justify-center py-4'>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};
