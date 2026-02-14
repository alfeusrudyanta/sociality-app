import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { ProfilePostItem } from '@/components/shared/profile-post-item';
import { useSave } from '@/hook/use-saves';

export const SavedComponent = () => {
  const { data, isPending } = useSave();

  const posts = data?.pages.flatMap((page) => page.data.posts) ?? [];

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
        page.data.posts.map((post) => (
          <ProfilePostItem
            key={post.id}
            id={post.id}
            imageUrl={post.imageUrl}
          />
        ))
      )}
    </div>
  );
};
