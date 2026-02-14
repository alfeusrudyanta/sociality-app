import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import {
  followersKeys,
  followingKeys,
  useDeleteFollow,
  useGetFollowers,
  useGetFollowing,
  usePostFollow,
} from '@/hook/use-follow';
import { LoadingSpinner } from './loading-spinner';
import type { UserSearch } from '@/types/api';
import { useMe } from '@/hook/use-my-profile';
import { queryClient } from '@/lib/query-client';

type FollowOverlayProps = {
  username: string;
  isOpen: boolean;
  isFollower?: boolean;
  setIsOpen: (open: boolean) => void;
};

export const FollowOverlay: React.FC<FollowOverlayProps> = ({
  username,
  isOpen,
  isFollower = true,
  setIsOpen,
}) => {
  const followers = useGetFollowers(username);
  const following = useGetFollowing(username);
  const { ref, inView } = useInView();

  const user = isFollower ? followers : following;

  useEffect(() => {
    if (inView && user.hasNextPage && !user.isFetchingNextPage) {
      user.fetchNextPage();
    }
  }, [inView, user.hasNextPage, user.isFetchingNextPage, user.fetchNextPage]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='md:max-w-137'>
        <DialogHeader>
          <DialogTitle className='text-md-bold md:text-xl-bold text-neutral-25 tracking-[-0.02em]'>
            {isFollower ? 'Follower' : 'Following'}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        <div className='hide-scrollbar flex flex-col gap-5 overflow-y-auto scroll-smooth'>
          {user.data?.pages.map((page) =>
            page.data.users.map((user) => (
              <FollowRow key={user.id} user={user} username={username} />
            ))
          )}

          <div ref={ref} />

          {user.isFetchingNextPage && (
            <div className='mt-5 flex w-full items-center justify-center md:mt-4'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

type LikeRowProps = {
  user: UserSearch;
  username: string;
};

const FollowRow: React.FC<LikeRowProps> = ({ user, username }) => {
  const { data } = useMe();
  const follow = usePostFollow(user.username);
  const unfollow = useDeleteFollow(user.username);

  const isMe = data?.data.profile.username === user.username;

  const handleFollow = () => {
    if (follow.isPending || unfollow.isPending) return;

    if (user.isFollowedByMe) {
      unfollow.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: followersKeys.list(username),
          });
          queryClient.invalidateQueries({
            queryKey: followingKeys.list(username),
          });
        },
      });
    } else {
      follow.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: followersKeys.list(username),
          });
          queryClient.invalidateQueries({
            queryKey: followingKeys.list(username),
          });
        },
      });
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <Link to={`/profile/${user.username}`}>
        <div className='flex items-center gap-2'>
          <img
            src={user.avatarUrl || '/images/profile-picture.png'}
            alt={user.name}
            className='size-12 rounded-full'
          />

          <div className='flex flex-col'>
            <span className='text-sm-bold text-neutral-25 tracking-[-0.01em]'>
              {user.name}
            </span>
            <span className='text-sm-regular tracking-[-0.02em] text-neutral-400'>
              {user.username}
            </span>
          </div>
        </div>
      </Link>

      {!isMe && (
        <Button
          type='button'
          size='button'
          onClick={handleFollow}
          variant={user.isFollowedByMe ? 'transparant' : 'default'}
          className={cn(user.isFollowedByMe ? 'max-w-31.75' : 'max-w-23.25')}
        >
          {/* Followed */}
          {user.isFollowedByMe && (
            <span className='text-sm-bold text-neutral-25 flex items-center gap-2'>
              <CircleCheck className='size-5' />
              Following
            </span>
          )}

          {/* Not Followed */}
          {!user.isFollowedByMe && (
            <span className='text-sm-bold text-neutral-25'>Follow</span>
          )}
        </Button>
      )}
    </div>
  );
};
