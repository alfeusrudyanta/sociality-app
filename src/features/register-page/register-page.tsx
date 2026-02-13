import { useRegister } from '@/hook/use-auth';
import { useState } from 'react';
import type { RegisterFormErrors } from './type';
import { registerSchema } from './schema';
import { FormLabel } from '@/components/shared/form-label';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { mutate, isPending } = useRegister();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<RegisterFormErrors>({});

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    /* Error Handling */
    setError({});

    const result = registerSchema.safeParse({
      name,
      username,
      email,
      phone,
      password,
    });

    if (!result.success) {
      const newError: RegisterFormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormErrors;
        newError[field] = err.message;
      });

      setError(newError);
      return;
    }

    /* Mutate */
    mutate(result.data);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[url('/images/shared-background.png')] bg-cover bg-center bg-no-repeat px-4">
      <div className='max-w- flex w-full max-w-130.75 flex-col items-center gap-4 rounded-2xl border border-neutral-900 bg-black/20 px-4 py-8 backdrop-blur-2xl md:gap-6 md:px-6 md:py-10'>
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
        <form onSubmit={handleRegister} className='flex w-full flex-col gap-5'>
          <FormLabel
            name='Name'
            id='name'
            type='text'
            placeholder='Enter your email'
            value={name}
            disabled={isPending}
            onChange={setName}
            error={error.name}
          />

          <FormLabel
            name='Username'
            id='username'
            type='text'
            placeholder='Enter your username'
            value={username}
            disabled={isPending}
            onChange={setUsername}
            error={error.username}
          />

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
            name='Phone Number'
            id='phone'
            type='tel'
            placeholder='Enter your phone number'
            value={phone}
            disabled={isPending}
            onChange={setPhone}
            error={error.phone}
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
              {isPending ? <LoadingSpinner /> : 'Submit'}
            </Button>

            <span className='text-sm-semibold md:text-md-semibold text-center tracking-[-0.02em]'>
              Already have an account?{' '}
              <Link to='/login'>
                <span className='text-primary-200'>Log in</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};
