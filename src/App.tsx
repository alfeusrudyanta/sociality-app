import {
  BrowserRouter,
  Route,
  Outlet,
  Routes,
  Navigate,
} from 'react-router-dom';

import { ScrollToTop } from './lib/scroll-to-top';
import { LoginPage } from './features/login-page';
import { RegisterPage } from './features/register-page';
import { HomePage } from './features/home-page';
import { AddPostPage } from './features/add-post-page';
import { FloatingMenu } from './components/shared/floating-menu';
import { MyProfilePage } from './features/my-profile-page';
import { ProfilePage } from './features/profile-page';
import { UpdateProfilePage } from './features/update-profile-page';
import { Header } from './components/layout/header';
import { ProtectedRoute } from './lib/protected-route';
import { PublicRoute } from './lib/public-route';

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
      <Header />
      <Outlet />
      <FloatingMenu />
    </div>
  );
};

const AppLayoutWithoutMenu = () => {
  return (
    <div className='text-neutral-25 flex min-h-screen flex-col bg-black'>
      <Header />
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
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* App with menu */}
          <Route element={<AppLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/my-profile' element={<MyProfilePage />} />
            <Route path='/update-profile' element={<UpdateProfilePage />} />
            <Route path='/profile/:username' element={<ProfilePage />} />
          </Route>

          {/* App without menu */}
          <Route element={<AppLayoutWithoutMenu />}>
            <Route path='/add-post' element={<AddPostPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};
