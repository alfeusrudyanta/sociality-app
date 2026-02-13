import { LoadingSpinner } from '@/components/shared/loading-spinner';

export const LoadingPage = () => {
  return (
    <section className='flex min-h-screen items-center justify-center'>
      <LoadingSpinner className='size-7 md:size-8' />
    </section>
  );
};
