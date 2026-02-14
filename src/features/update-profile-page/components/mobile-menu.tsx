import type { GetMeResponse } from '@/types/api-my-profile';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type MobileMenuProps = {
  data?: GetMeResponse;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ data }) => {
  return (
    <div className='absolute top-0 z-10 flex h-16 w-full items-center justify-between border-b border-neutral-900 bg-black px-4 md:hidden'>
      <Link to='/' className='flex items-center gap-3'>
        <ArrowLeft className='size-6' />
        <span className='text-md-bold tracking-[-0.02em]'>
          {data?.data.profile.name}
        </span>
      </Link>

      <Link to='/my-profile'>
        <img
          src={data?.data.profile.avatarUrl || '/images/profile-picture.png'}
          alt={data?.data.profile.name ?? 'User Profile Picture'}
          className='size-10 cursor-pointer rounded-full'
        />
      </Link>
    </div>
  );
};
