import { ProfilePostItem } from '@/components/shared/profile-post-item';
import { useUserLikes } from '@/hook/use-users';

type LikedComponentProps = {
  username: string;
};

export const LikedComponent: React.FC<LikedComponentProps> = ({ username }) => {
  const { data } = useUserLikes(username);

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
