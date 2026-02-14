import { ProfilePostItem } from '@/components/shared/profile-post-item';
import { useMePosts } from '@/hook/use-my-profile';

export const GalleryComponent = () => {
  const { data } = useMePosts();

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
    </div>
  );
};
