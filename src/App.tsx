import {
  BrowserRouter,
  Route,
  Outlet,
  Routes,
  Navigate,
} from 'react-router-dom';

import { ScrollToTop } from '@/lib/scroll-to-top';
import { LoginPage } from '@/features/login-page';
import { RegisterPage } from '@/features/register-page';
import { HomePage } from '@/features/home-page';
import { AddPostPage } from '@/features/add-post-page';
import { FloatingMenu } from '@/components/shared/floating-menu';
import { MyProfilePage } from '@/features/my-profile-page';
import { ProfilePage } from '@/features/profile-page';

const AuthLayout = () => {
  return (
    <div className='text-neutral-25 flex min-h-screen flex-col bg-black'>
      <Outlet />
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className='text-neutral-25 flex min-h-screen flex-col bg-black'>
      <header />
      <Outlet />
      <FloatingMenu />
    </div>
  );
};

const AppLayoutWithoutMenu = () => {
  return (
    <div className='text-neutral-25 flex min-h-screen flex-col bg-black'>
      <header />
      <Outlet />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        {/* App with menu */}
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/my-profile' element={<MyProfilePage />} />
          <Route path='/update-profile' element={<div />} />
          <Route path='/profile/:username' element={<ProfilePage />} />
        </Route>

        {/* App without menu */}
        <Route element={<AppLayoutWithoutMenu />}>
          <Route path='/add-post' element={<AddPostPage />} />
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};
