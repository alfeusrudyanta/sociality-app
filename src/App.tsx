import { BrowserRouter, Route, Outlet, Routes } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-black'>
      <Outlet />
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-black'>
      <header />
      <Outlet />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<div />} />
          <Route path='/register' element={<div />} />
        </Route>

        {/* App routes (with header) */}
        <Route element={<AppLayout />}>
          <Route path='/' element={<div />} />
          <Route path='/search' element={<div />} />
          <Route path='/my-profile' element={<div />} />
          <Route path='/add-post' element={<div />} />
          <Route path='/update-profile' element={<div />} />
          <Route path='/profile/:username' element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
