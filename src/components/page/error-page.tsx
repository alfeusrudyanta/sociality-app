import { Button } from '@/components/ui/button';

export const ErrorPage = () => {
  return (
    <section className='mx-auto flex min-h-screen max-w-120 flex-col items-center justify-center gap-4 p-4 md:gap-5'>
      <div className='flex w-full flex-col gap-2 md:gap-3'>
        <span className='display-md-extrabold md:display-lg-extrabold md tracking-[-0.02em]'>
          Something went wrong
        </span>

        <span className='text-sm-regular md:text-md-regular'>
          An unexpected error occurred. Please try again.
        </span>
      </div>

      <Button onClick={() => window.location.reload()}>Refresh Page</Button>
    </section>
  );
};
