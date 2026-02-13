import { useLogin } from '@/hook/use-auth';
import { useState } from 'react';
import { loginSchema } from './schema';
import type { LoginFormErrors } from './type';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { FormLabel } from '@/components/shared/form-label';

export const LoginPage = () => {
  const { mutate, isPending } = useLogin();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<LoginFormErrors>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    /* Error Handling */
    setError({});

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const newError: LoginFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LoginFormErrors;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    mutate(result.data);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[url('/images/shared-background.png')] bg-cover bg-center bg-no-repeat px-4">
      <div className='flex w-full max-w-130.75 flex-col items-center gap-4 rounded-2xl border border-neutral-900 bg-black/20 px-4 py-8 backdrop-blur-2xl md:gap-6 md:px-6 md:py-10'>
        {/* Logo */}
        <div className='flex items-center justify-center gap-2.75'>
          <img
            src='/icons/shared-logo.svg'
            alt='Social Media Logo'
            className='size-7.5'
          />
          <span className='display-xs-bold'>Sociality</span>
        </div>

        {/* Welcome */}
        <span className='text-xl-bold md:display-xs-bold tracking-[-0.02em] md:tracking-normal'>
          Welcome Back!
        </span>

        {/* Form */}
        <form onSubmit={handleLogin} className='flex w-full flex-col gap-5'>
          <FormLabel
            name='Email'
            id='email'
            type='email'
            placeholder='Enter your email'
            value={email}
            disabled={isPending}
            onChange={setEmail}
            error={error.email}
          />

          <FormLabel
            name='Password'
            id='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            disabled={isPending}
            onChange={setPassword}
            error={error.password}
          />
          {/* Button */}
          <div className='flex flex-col gap-4'>
            <Button type='submit' disabled={isPending}>
              {isPending ? <LoadingSpinner /> : 'Login'}
            </Button>

            <span className='text-sm-semibold md:text-md-semibold text-center tracking-[-0.02em]'>
              Don&apos;t have an account?{' '}
              <Link to='/register'>
                <span className='text-primary-200'>Register</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
