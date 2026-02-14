import { likesKeys, useGetPostLikes } from '@/hook/use-likes';
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
import { useDeleteFollow, usePostFollow } from '@/hook/use-follow';
import { queryClient } from '@/lib/query-client';
import { LoadingSpinner } from './loading-spinner';

type LikeOverlayProps = {
  id: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const LikeOverlay: React.FC<LikeOverlayProps> = ({
  id,
  isOpen,
  setIsOpen,
}) => {
  const { ref, inView } = useInView();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPostLikes(id);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const likeData = data?.pages.flatMap((page) => page.data.users) ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='md:max-w-137'>
        <DialogHeader>
          <DialogTitle className='text-md-bold md:text-xl-bold text-neutral-25 tracking-[-0.02em]'>
            Like
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>

        {likeData.length === 0 && (
          <span className='text-sm-regular md:text-md-regular text-neutral-25 -mt-5'>
            Be the first to like this post
          </span>
        )}

        <div className='hide-scrollbar flex flex-col gap-5 overflow-y-auto scroll-smooth'>
          {likeData.map((likes) => (
            <LikeRow key={likes.id} likes={likes} postId={id} />
          ))}

          <div ref={ref} />

          {isFetchingNextPage && (
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
  postId: number;
  likes: {
    id: number;
    username: string;
    name: string;
    avatarUrl: string;
    isFollowedByMe: boolean;
    isMe: boolean;
    followsMe: boolean;
  };
};

const LikeRow: React.FC<LikeRowProps> = ({ likes, postId }) => {
  const follow = usePostFollow(likes.username);
  const unfollow = useDeleteFollow(likes.username);

  const handleFollow = () => {
    if (follow.isPending || unfollow.isPending) return;

    if (likes.isFollowedByMe) {
      unfollow.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: likesKeys.list(postId) });
        },
      });
    } else {
      follow.mutate(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: likesKeys.list(postId) });
        },
      });
    }
  };

  return (
    <div className='flex items-center justify-between'>
      <Link to={`/profile/${likes.username}`}>
        <div className='flex items-center gap-2'>
          <img
            src={likes.avatarUrl || '/images/profile-picture.png'}
            alt={likes.name}
            className='size-12 rounded-full'
          />

          <div className='flex flex-col'>
            <span className='text-sm-bold text-neutral-25 tracking-[-0.01em]'>
              {likes.name}
            </span>
            <span className='text-sm-regular tracking-[-0.02em] text-neutral-400'>
              {likes.username}
            </span>
          </div>
        </div>
      </Link>

      {!likes.isMe && (
        <Button
          type='button'
          size='button'
          onClick={handleFollow}
          variant={likes.isFollowedByMe ? 'transparant' : 'default'}
          className={cn(likes.isFollowedByMe ? 'max-w-31.75' : 'max-w-23.25')}
        >
          {/* Followed */}
          {likes.isFollowedByMe && (
            <span className='text-sm-bold text-neutral-25 flex items-center gap-2'>
              <CircleCheck className='size-5' />
              Following
            </span>
          )}

          {/* Not Followed */}
          {!likes.isFollowedByMe && (
            <span className='text-sm-bold text-neutral-25'>Follow</span>
          )}
        </Button>
      )}
    </div>
  );
};
