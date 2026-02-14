import { ProfilePostItem } from '@/components/shared/profile-post-item';
import { useSave } from '@/hook/use-saves';

export const SavedComponent = () => {
  const { data } = useSave();

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
