import { Search, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMe } from '../../../hook/use-my-profile';
import { useIsMobile } from '../../../hook/use-is-mobile';
import { useLogout } from '../../../hook/use-auth';
import { Link } from 'react-router-dom';
import { SearchBar } from './components/search-bar';

export const Header = () => {
  const { data, isPending, isError } = useMe();
  const isMobile = useIsMobile();
  const logout = useLogout();

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const [isSearhOpen, setIsSearchOpen] = useState<boolean>(false);

  const logoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target as Node)) {
        setIsLogoutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [isMobile]);

  if (!data && !isPending && isError) {
    return;
  }

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className='fixed z-10 flex h-16 w-full items-center border-b border-neutral-900 bg-black md:h-20'>
      <div className='relative mx-auto flex w-full max-w-300 items-center justify-between gap-4 px-4 lg:px-30'>
        {/* Logo */}
        <Link to='/'>
          <div className='flex items-center gap-3'>
            <img
              src='/icons/shared-logo.svg'
              alt='Sociality Logo'
              className='size-7.5'
            />

            <span className='display-xs-bold md:display-xs-bold'>
              Sociality
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        {!isMobile && <SearchBar />}

        <div className='flex items-center gap-4'>
          {/* Search Icon */}
          {isMobile && (
            <Search
              onClick={() => setIsSearchOpen(true)}
              className='size-5 cursor-pointer'
            />
          )}

          {/* Profile Picture */}
          <div
            ref={logoutRef}
            onClick={() => setIsLogoutOpen((prev) => !prev)}
            className='relative flex cursor-pointer items-center gap-3'
          >
            <img
              src={
                data?.data.profile.avatarUrl ?? '/images/profile-picture.png'
              }
              alt={data?.data.profile.name ?? 'User Profile Picture'}
              className='size-10 rounded-full'
            />

            {/* Desktop */}
            {!isMobile && (
              <span className='text-md-bold tracking-[-0.02em]'>
                {data?.data.profile.name}
              </span>
            )}

            {/* Logout Button */}
            {isLogoutOpen && (
              <div className='absolute top-15 right-0 flex w-50 flex-col gap-2 rounded-2xl border border-neutral-900 bg-neutral-950 px-4 py-2'>
                <Link
                  to={`/profile/${data?.data.profile.username}`}
                  key={data?.data.profile.id}
                  className='group flex w-full cursor-pointer items-center gap-2'
                >
                  <img
                    src={
                      data?.data.profile.avatarUrl ||
                      '/images/profile-picture.png'
                    }
                    alt={data?.data.profile.name || 'User Profile Picture'}
                    className='size-12 rounded-full'
                  />

                  <div className='flex w-full flex-col'>
                    <span className='group-hover:text-primary-300 text-sm-bold md:text-sm-bold tracking-[-0.01em]'>
                      {data?.data.profile.name}
                    </span>

                    <span className='md:text-sm-regular tracking-[-0.02em] text-neutral-400'>
                      @{data?.data.profile.username}
                    </span>
                  </div>
                </Link>

                <div className='w-full border border-neutral-900' />

                <button
                  onClick={handleLogOut}
                  className='hover:text-accent-red w-full cursor-pointer text-start transition-all'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search */}
      {isSearhOpen && (
        <div className='absolute top-0 z-10 flex h-16 w-full items-center gap-4 bg-black px-4'>
          <SearchBar />

          <XIcon
            onClick={() => setIsSearchOpen(false)}
            className='size-4 cursor-pointer md:size-5'
          />
        </div>
      )}
    </div>
  );
};
