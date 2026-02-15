import { useDeleteLike, useLikes, usePostLike } from '@/hook/use-likes';
import { useDeleteSave, usePostSave, useSave } from '@/hook/use-saves';
import { cn } from '@/lib/utils';
import type { PostSummary } from '@/types/api';
import { Bookmark, Heart, MessageSquareMore, Send } from 'lucide-react';
import { useState } from 'react';
import { LikeOverlay } from '@/components/shared/like-overlay';
import { CommentOverlay } from './comment-overlay';
import { useMe } from '@/hook/use-my-profile';

type LikeCommentSaveProps = {
  post: PostSummary;
};

export const LikeCommentSave: React.FC<LikeCommentSaveProps> = ({ post }) => {
  const saveData = useSave();
  const meData = useMe();
  const likedData = useLikes(post.id);

  const like = usePostLike(post.id);
  const unlike = useDeleteLike(post.id);
  const save = usePostSave(post.id);
  const unsave = useDeleteSave(post.id);

  const [isLikeOpen, setIsLikeOpen] = useState<boolean>(false);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const saved = saveData.data?.pages.some((page) =>
    page.data.posts.some((p) => p.id === post.id)
  );

  const likedByMe = likedData.data?.pages.some((page) =>
    page.data.users.some((u) => u.id === meData.data?.data.profile.id)
  );

  const handleLike = () => {
    if (like.isPending || unlike.isPending) return;

    if (likedByMe) {
      unlike.mutate();
      return;
    }

    like.mutate();
  };

  const handleSave = () => {
    if (save.isPending || unsave.isPending) return;

    if (saved) {
      unsave.mutate();
      return;
    }

    save.mutate();
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex h-7 items-center gap-3 md:h-7.5 md:gap-4'>
        <div className='flex items-center gap-[6px]'>
          <Heart
            className={cn(
              'stroke-neutral-25 size-6 cursor-pointer',
              likedByMe && 'fill-accent-red stroke-accent-red'
            )}
            onClick={handleLike}
          />

          <span
            onClick={() => setIsLikeOpen((prev) => !prev)}
            className='text-md-semibold text-neutral-25 cursor-pointer'
          >
            {post.likeCount}
          </span>
        </div>

        <div
          onClick={() => setIsCommentOpen((prev) => !prev)}
          className='flex cursor-pointer items-center gap-[6px]'
        >
          <MessageSquareMore className='stroke-neutral-25 size-6 cursor-pointer' />
          <span className='text-md-semibold text-neutral-25 cursor-pointer'>
            {post.commentCount}
          </span>
        </div>

        <div className='flex cursor-pointer items-center gap-[6px]'>
          <Send className='stroke-neutral-25 size-6' />
          <span className='text-md-semibold text-neutral-25 cursor-pointer'>
            0
          </span>
        </div>
      </div>

      <Bookmark
        onClick={handleSave}
        className={cn('size-6 cursor-pointer', saved && 'fill-neutral-25')}
      />

      <CommentOverlay
        id={post.id}
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
      />

      <LikeOverlay id={post.id} isOpen={isLikeOpen} setIsOpen={setIsLikeOpen} />
    </div>
  );
};
