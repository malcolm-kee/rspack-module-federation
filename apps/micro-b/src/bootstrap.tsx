import ReactDOMClient from 'react-dom/client';
import { App } from './app';
import { QueryClient, QueryClientProvider } from '@rspack-mf/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

ReactDOMClient.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
