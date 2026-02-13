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
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Route>

        {/* App routes (with header) */}
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<div />} />
          <Route path='/my-profile' element={<div />} />
          <Route path='/add-post' element={<div />} />
          <Route path='/update-profile' element={<div />} />
          <Route path='/profile/:username' element={<div />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
