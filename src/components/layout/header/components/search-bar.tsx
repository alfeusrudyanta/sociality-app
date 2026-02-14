import { useUserSearch } from '@/hook/use-users';
import { Search, XIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SearchBar = () => {
  const [q, setQ] = useState('');
  const { data } = useUserSearch(q);

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { pathname } = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (q.trim().length === 0) {
      setShowSearch(false);
      return;
    }
  }, [q]);

  useEffect(() => {
    setQ('');
  }, [pathname]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setShowSearch(true);
  };

  return (
    <div
      ref={containerRef}
      className='relative flex h-10 flex-1 items-center gap-2 rounded-full border border-neutral-900 bg-neutral-950 px-4 md:mx-4 md:h-12 md:max-w-122.5'
    >
      <Search className='size-5 cursor-pointer' />

      <input
        type='text'
        placeholder='Search'
        value={q}
        className='w-full border-none px-0 outline-0 focus-visible:border-0 focus-visible:ring-0'
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {q.length > 0 && (
        <XIcon
          onClick={() => {
            setQ('');
          }}
          className='size-4 cursor-pointer md:size-5'
        />
      )}

      {showSearch && (
        <div className='absolute top-11.75 flex w-full -translate-x-4 flex-col gap-4 rounded-3xl border border-neutral-900 bg-neutral-950 p-4 md:top-14.5 md:p-5'>
          {data?.pages[0].data.users.length === 0 ? (
            <div className='flex flex-col items-center justify-center text-center md:h-38.75'>
              <span className='text-md-bold md:text-lg-bold'>
                No results found
              </span>

              <span className='text-neutral-400'>Change your keyword</span>
            </div>
          ) : (
            data?.pages[0].data.users.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                key={user.id}
                className='group flex w-full cursor-pointer items-center gap-2'
              >
                <img
                  src={user.avatarUrl || '/images/profile-picture.png'}
                  alt={user.name || 'User Profile Picture'}
                  className='size-12 rounded-full'
                />

                <div className='flex w-full flex-col'>
                  <span className='group-hover:text-primary-300 text-sm-bold md:text-sm-bold tracking-[-0.01em]'>
                    {user.name}
                  </span>

                  <span className='md:text-sm-regular tracking-[-0.02em] text-neutral-400'>
                    {user.username}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
