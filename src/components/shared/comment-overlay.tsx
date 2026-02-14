import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Ellipsis, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDeletePost, usePost } from '@/hook/use-posts';
import { useMe } from '@/hook/use-my-profile';
import { useEffect, useRef, useState } from 'react';
import {
  useComments,
  useDeleteComment,
  usePostComment,
} from '@/hook/use-comments';
import type { Comment } from '@/types/api';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from './loading-spinner';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { LikeCommentSave } from './like-comment-save';

type CommentOverlayProps = {
  id: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const CommentOverlay: React.FC<CommentOverlayProps> = ({
  id,
  isOpen,
  setIsOpen,
}) => {
  const post = usePost(id);
  const me = useMe();
  const commentsQuery = useComments(id);
  const postComment = usePostComment(id);
  const deletePost = useDeletePost(id);
  const { ref, inView } = useInView();

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [textInput, setTextInput] = useState<string>('');

  const menuRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  const trimmedText = textInput.trim();

  useEffect(() => {
    if (
      inView &&
      commentsQuery.hasNextPage &&
      !commentsQuery.isFetchingNextPage
    ) {
      commentsQuery.fetchNextPage();
    }
  }, [
    inView,
    commentsQuery.hasNextPage,
    commentsQuery.isFetchingNextPage,
    commentsQuery.fetchNextPage,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDeleteOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setIsEmojiOpen(false);
      }
    };

    if (isEmojiOpen) {
      document.addEventListener('mousedown', handler);
    }

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [isEmojiOpen]);

  const handleDeletePost = () => {
    if (deletePost.isPending) return;

    deletePost.mutate(undefined, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        setIsOpen(false);
      },
    });
    setIsOpen(false);
  };

  const handlePostComment = () => {
    if (postComment.isPending || trimmedText.length === 0) return;

    const params = {
      text: trimmedText,
    };

    postComment.mutate(params, {
      onSuccess: () => {
        setTextInput('');
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePostComment();
    }
  };

  const comments =
    commentsQuery.data?.pages.flatMap((comment) => comment.data.comments) ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='flex flex-row gap-0 overflow-hidden rounded-2xl bg-neutral-950 p-0 md:max-h-[85%] md:max-w-[85%] md:p-0 md:px-4'>
        <DialogHeader>
          <DialogTitle className='sr-only'>Comments</DialogTitle>
        </DialogHeader>

        {/* Column Left */}
        <div className='hidden aspect-square max-h-180 max-w-180 flex-6 overflow-hidden md:flex'>
          <img
            src={post.data?.data.imageUrl || '/images/post-img.png'}
            alt='Feed Image'
            className='size-full object-cover object-center'
          />
        </div>

        {/* Column Right */}
        <div className='flex flex-4 flex-col gap-3 p-4 md:gap-4 md:p-5'>
          {/* Feed Detail */}
          <div className='hidden flex-col gap-2 md:flex'>
            {/* Author */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3.25'>
                <Link to={`/profile/${post.data?.data.author.username}`}>
                  <img
                    src={
                      post.data?.data.author.avatarUrl ||
                      '/images/profile-picture.png'
                    }
                    alt={post.data?.data.author.name}
                    className='size-10 rounded-full'
                  />
                </Link>

                {/* Name */}
                <div className='flex flex-col'>
                  <Link to={`/profile/${post.data?.data.author.username}`}>
                    <span className='md:text-sm-bold text-neutral-25 md:tracking-[-0.01em]'>
                      {post.data?.data.author.name}
                    </span>
                  </Link>

                  <span className='md:text-xs-regular text-neutral-400'>
                    {dayjs(post.data?.data.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              {me.data?.data.profile.username ===
                post.data?.data.author.username && (
                <div className='relative' ref={menuRef}>
                  <Ellipsis
                    onClick={() => setIsDeleteOpen((prev) => !prev)}
                    className='text-neutral-25 cursor-pointer'
                  />

                  {isDeleteOpen && (
                    <div className='absolute right-0 -bottom-10 w-50 rounded-2xl border border-neutral-900 bg-neutral-950 px-4 py-2'>
                      <button
                        onClick={handleDeletePost}
                        className='hover:text-accent-red text-neutral-25 w-full cursor-pointer text-start transition-all'
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Scrollable Caption */}
            <div className='hide-scrollbar h-11xl overflow-y-auto scroll-smooth'>
              <span className='md:text-sm-regular text-neutral-25 md:tracking-[-0.02em]'>
                {post.data?.data.caption}
              </span>
            </div>

            <div className='w-full border border-neutral-900' />
          </div>

          {/* Comment List */}
          <div className='flex h-full flex-col gap-3 md:gap-4'>
            <span className='text-md-bold md:text-md-bold text-neutral-25 tracking-[-0.02em]'>
              Comments
            </span>

            <div className='hide-scrollbar flex h-full max-h-100 flex-col gap-3 overflow-y-auto scroll-smooth md:max-h-75 md:gap-4'>
              {comments.length > 0 && (
                <>
                  {comments.map((comment, index) => (
                    <div
                      key={comment.id}
                      className='flex flex-col gap-3 md:gap-4'
                    >
                      <CommentCard
                        username={me.data?.data.profile.username || 'User'}
                        postId={id}
                        comment={comment}
                      />

                      {/* Line */}
                      {index < comments.length - 1 && (
                        <div className='w-full border border-neutral-900' />
                      )}
                    </div>
                  ))}

                  <div ref={ref} />

                  {commentsQuery.isFetchingNextPage && (
                    <div className='mt-3 flex w-full items-center justify-center md:mt-4'>
                      <LoadingSpinner />
                    </div>
                  )}
                </>
              )}

              {/* Zero Comment */}
              {comments.length === 0 && (
                <div className='flex items-center justify-center py-15 text-center'>
                  <div className='flex flex-col gap-1'>
                    <span className='md:text-md-bold text-sm-bold text-neutral-25'>
                      No Comments yet
                    </span>
                    <span className='text-sm-regular md:text-md-regular text-neutral-400'>
                      Start the conversation
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Post Comment */}
            <div className='flex w-full flex-col gap-4'>
              <LikeCommentSave post={post.data?.data!} />

              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Button
                    type='button'
                    variant='transparant'
                    size='button'
                    onClick={() => setIsEmojiOpen((prev) => !prev)}
                    className='size-12 cursor-pointer rounded-xl'
                  >
                    <Smile />
                  </Button>

                  {isEmojiOpen && (
                    <div
                      ref={emojiRef}
                      className='absolute bottom-14 left-0 z-50'
                    >
                      <EmojiPicker
                        theme={Theme.DARK}
                        onEmojiClick={(emoji) =>
                          setTextInput((prev) => prev + emoji.emoji)
                        }
                        width={320}
                      />
                    </div>
                  )}
                </div>

                <div className='flex h-12 w-full items-center gap-4 rounded-xl border border-neutral-900 px-4'>
                  <input
                    type='text'
                    placeholder='Add Comment'
                    value={textInput}
                    onKeyDown={handleKeyDown}
                    disabled={commentsQuery.isPending}
                    onChange={(e) => setTextInput(e.currentTarget.value)}
                    className='text-sm-medium md:text-md-medium text-neutral-25 flex-1 border-0 bg-transparent ring-0 outline-none focus:border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none'
                  />

                  <button
                    disabled={trimmedText.length === 0 || postComment.isPending}
                    onClick={handlePostComment}
                    className={cn(
                      'cursor-pointer disabled:text-neutral-600',
                      trimmedText.length > 0 && 'text-primary-200'
                    )}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type CommentCardProps = {
  postId: number;
  comment: Comment;
  username: string;
};

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  username,
  postId,
}) => {
  const { mutate, isPending } = useDeleteComment(postId);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDeleteOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteComment = () => {
    if (isPending) return;

    mutate(comment.id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
      },
    });
  };

  return (
    <div className='flex flex-col gap-2 md:gap-2.5'>
      <div className='flex items-center justify-between'>
        {/* User */}
        <div className='flex items-center gap-2'>
          <Link to={`/profile/${comment.author.username}`}>
            <img
              src={comment.author.avatarUrl || '/images/profile-picture.png'}
              alt={comment.author.name}
              className='size-10 rounded-full'
            />
          </Link>

          <div className='flex flex-col'>
            <Link to={`/profile/${comment.author.username}`}>
              <span className='md:text-sm-bold text-xs-semibold text-neutral-25 md:tracking-[-0.01em]'>
                {comment.author.name}
              </span>
            </Link>
            <span className='text-xs-regular md:text-xs-regular tracking-[-0.03em] text-neutral-400 md:tracking-normal'>
              {dayjs(comment.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {/* Delete */}
        {username === comment.author.username && (
          <div className='relative' ref={menuRef}>
            <Ellipsis
              onClick={() => setIsDeleteOpen((prev) => !prev)}
              className='text-neutral-25 cursor-pointer'
            />

            {isDeleteOpen && (
              <div className='absolute right-0 -bottom-10 w-50 rounded-2xl border border-neutral-900 bg-neutral-950 px-4 py-2'>
                <button
                  onClick={handleDeleteComment}
                  className='hover:text-accent-red text-neutral-25 w-full cursor-pointer text-start transition-all'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comment */}
      <span className='text-neutral-25 md:text-sm-regular text-xs-regular tracking-[-0.03em] md:tracking-[-0.02em]'>
        {comment.text}
      </span>
    </div>
  );
};
