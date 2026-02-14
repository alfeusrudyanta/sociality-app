import type { PostSummary } from '@/types/api';
import { dayjs } from '@/lib/dayjs';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LikeCommentSave } from '@/components/shared/like-comment-save';
import { cn } from '@/lib/utils';
import { CommentOverlay } from '@/components/shared/comment-overlay';

type CardProps = {
  post: PostSummary;
};

export const Card: React.FC<CardProps> = ({ post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isClamped, setIsClamped] = useState<boolean>(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const span = spanRef.current;
    if (span) {
      setIsClamped(span.scrollHeight > span.clientHeight);
    }
  }, [post.caption]);

  return (
    <div className='flex flex-col gap-2 md:gap-3'>
      {/* Creator */}
      <div className='flex items-center gap-2 md:gap-3'>
        <Link to={`/profile/${post.author.username}`}>
          <img
            src={post.author.avatarUrl || '/images/profile-picture.png'}
            alt={post.author.name}
            className='size-11 rounded-full md:size-16'
          />
        </Link>

        <div className='flex flex-col'>
          <Link to={`/profile/${post.author.username}`}>
            <span className='text-sm-bold md:text-md-bold tracking-[-0.01em] md:tracking-[-0.02em]'>
              {post.author.name}
            </span>
          </Link>

          <span className='md:text-sm-regular text-xs-regular text-neutral-400 md:tracking-[-0.02em]'>
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Image */}
      <div
        onClick={() => setIsCommentOpen(!isCommentOpen)}
        className='aspect-square max-h-150 w-full max-w-150 overflow-hidden rounded-md'
      >
        <img
          src={post.imageUrl || '/images/post-img.png'}
          alt='Feed Image'
          className='h-full w-full cursor-pointer object-cover object-center'
        />
      </div>

      {/* Like & Comment & Save */}
      <LikeCommentSave post={post} />

      {/* Text */}
      <div className='flex w-[88%] flex-col md:gap-1'>
        <Link to={`/profile/${post.author.username}`}>
          <span className='md:text-md-bold text-sm-bold tracking-[-0.01em] md:tracking-[-0.02em]'>
            {post.author.username}
          </span>
        </Link>

        <span
          ref={spanRef}
          className={cn('tracking-[-0.02em]', !showMore && 'line-clamp-2')}
        >
          {post.caption}
        </span>

        {!showMore && isClamped && (
          <span
            onClick={() => setShowMore(true)}
            className='text-primary-200 text-sm-bold md:text-md-semibold cursor-pointer tracking-[-0.01em] md:tracking-[-0.02em]'
          >
            Show More
          </span>
        )}
      </div>

      <CommentOverlay
        id={post.id}
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
      />
    </div>
  );
};
