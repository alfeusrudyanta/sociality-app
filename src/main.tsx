import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import './index.css';
import { queryClient } from '@/lib/query-client.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position='top-right' />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
