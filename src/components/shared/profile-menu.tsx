import type { UserProfile, UserStats } from '@/types/api';
import { CircleCheck, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useDeleteFollow, usePostFollow } from '@/hook/use-follow';
import { useState } from 'react';
import { FollowOverlay } from './follow-overlay';

type ProfileMenuProps = {
  profile: UserProfile;
  counts: UserStats;
  isMe?: boolean;
  isFollowing?: boolean;
};

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  profile,
  counts,
  isMe = false,
  isFollowing = false,
}) => {
  const navigate = useNavigate();
  const follow = usePostFollow(profile.username);
  const unfollow = useDeleteFollow(profile.username);

  const [isFollowerOpen, setIsFollowerOpen] = useState<boolean>(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState<boolean>(false);

  const handleFollow = () => {
    if (follow.isPending || unfollow.isPending) return;

    if (isFollowing) {
      unfollow.mutate();
    } else {
      follow.mutate();
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        {/* Profile */}
        <div className='flex items-center gap-3 md:gap-5'>
          <img
            src={profile.avatarUrl || '/images/profile-picture.png'}
            alt={profile.name}
            className='size-16 rounded-full'
          />

          <div className='flex flex-col'>
            <span className='text-sm-bold md:text-md-bold tracking-[-0.01em] md:tracking-[-0.02em]'>
              {profile.name}
            </span>

            <span className='tracking-[-0.02em]'>@{profile.username}</span>
          </div>
        </div>

        {/* Button */}
        <div className='flex items-center justify-end gap-3'>
          {isMe && (
            <Button
              type='button'
              onClick={() => navigate('/update-profile')}
              variant='transparant'
              className='flex-1 md:max-w-32.5 md:flex-none'
            >
              Edit Profile
            </Button>
          )}

          {!isMe && (
            <Button
              type='button'
              size='button'
              onClick={handleFollow}
              variant={isFollowing ? 'transparant' : 'default'}
              className={cn(
                'w-full flex-1 md:flex-none',
                isFollowing ? 'md:max-w-31.75' : 'md:max-w-23.25'
              )}
            >
              {/* Followed */}
              {isFollowing && (
                <span className='text-sm-bold text-neutral-25 flex items-center gap-2'>
                  <CircleCheck className='size-5' />
                  Following
                </span>
              )}

              {/* Not Followed */}
              {!isFollowing && (
                <span className='text-sm-bold text-neutral-25'>Follow</span>
              )}
            </Button>
          )}

          <Button
            variant='transparant'
            size='button'
            className='size-12 rounded-full'
          >
            <Send className='size-6' />
          </Button>
        </div>
      </div>

      {/* Bio */}
      <span className='tracking-[-0.02em]'>{profile.bio}</span>

      {/* Status */}
      <div className='grid w-full grid-cols-4 divide-x divide-neutral-900'>
        {/* Post */}
        <div className='flex flex-col gap-0.5 text-center'>
          <span className='text-lg-bold md:text-xl-bold tracking-[-0.03em] md:tracking-[-0.02em]'>
            {counts.posts || 0}
          </span>

          <span className='text-xs-regular text-neutral-400 md:tracking-[-0.02em]'>
            Post
          </span>
        </div>

        {/* Followers */}
        <button
          onClick={() => setIsFollowerOpen((prev) => !prev)}
          className='flex cursor-pointer flex-col gap-0.5 text-center'
        >
          <span className='text-lg-bold md:text-xl-bold tracking-[-0.03em] md:tracking-[-0.02em]'>
            {counts.followers || 0}
          </span>

          <span className='text-xs-regular text-neutral-400 md:tracking-[-0.02em]'>
            Followers
          </span>
        </button>

        {/* Following */}
        <button
          onClick={() => setIsFollowingOpen((prev) => !prev)}
          className='flex cursor-pointer flex-col gap-0.5 text-center'
        >
          <span className='text-lg-bold md:text-xl-bold tracking-[-0.03em] md:tracking-[-0.02em]'>
            {counts.following || 0}
          </span>

          <span className='text-xs-regular text-neutral-400 md:tracking-[-0.02em]'>
            Following
          </span>
        </button>

        {/* Likes */}
        <div className='flex flex-col gap-0.5 text-center'>
          <span className='text-lg-bold md:text-xl-bold tracking-[-0.03em] md:tracking-[-0.02em]'>
            {counts.likes || 0}
          </span>

          <span className='text-xs-regular text-neutral-400 md:tracking-[-0.02em]'>
            Likes
          </span>
        </div>
      </div>

      <FollowOverlay
        isOpen={isFollowerOpen}
        setIsOpen={setIsFollowerOpen}
        username={profile.username}
      />

      <FollowOverlay
        isOpen={isFollowingOpen}
        setIsOpen={setIsFollowingOpen}
        username={profile.username}
        isFollower={false}
      />
    </div>
  );
};
