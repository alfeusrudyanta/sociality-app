import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { House, Plus, UserRound } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const FloatingMenu = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY === 0) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 w-full -translate-x-1/2 px-6 transition-all duration-300 md:bottom-8 md:max-w-90',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-24 opacity-0'
      )}
    >
      <div className='flex h-16 w-full items-center justify-between rounded-full border border-neutral-900 bg-neutral-950 px-8 md:h-20'>
        {/* Home */}
        <Link
          to='/'
          className='group flex flex-col items-center justify-center'
        >
          <House
            className={cn(
              'group-hover:text-primary-200/90 size-5 transition-all md:size-6',
              pathname === '/' && 'text-primary-200'
            )}
          />

          <span
            className={cn(
              'group-hover:text-primary-200/90 transition-all',
              pathname === '/' &&
                'text-primary-200! text-sm-bold md:text-md-bold'
            )}
          >
            Home
          </span>
        </Link>

        {/* Add Post */}
        <Link to='/addPost'>
          <Button size='button' className='size-12'>
            <Plus />
          </Button>
        </Link>

        {/* Profile */}
        <Link
          className='group flex flex-col items-center justify-center'
          to='/my-profile'
        >
          <UserRound
            className={cn(
              'group-hover:text-primary-200/90 size-5 transition-all md:size-6',
              pathname === '/my-profile' && 'text-primary-200!'
            )}
          />
          <span
            className={cn(
              'group-hover:text-primary-200/90 transition-all',
              pathname === '/my-profile' &&
                'text-primary-200 text-sm-bold md:text-md-bold'
            )}
          >
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
};
