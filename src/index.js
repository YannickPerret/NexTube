import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
<QueryClientProvider client={queryClient}>
    <App tab="home" />
</QueryClientProvider>
);
