import { ProfilePostItem } from '@/components/shared/profile-post-item';
import { useUserPosts } from '@/hook/use-users';

type GalleryComponentProps = {
  username: string;
};

export const GalleryComponent: React.FC<GalleryComponentProps> = ({
  username,
}) => {
  const { data } = useUserPosts(username);

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
