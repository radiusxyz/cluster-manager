import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EcoPage from './pages/EcoPage';
import GlobalPage from './pages/GlobalPage';
import RootLayout from './pages/RootLayout';
import ProfilePage from './pages/ProfilePage';
import { AccountProvider } from './contexts/AccountContext';
import Project from './pages/Project';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: '/global',
        element: <GlobalPage />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: '/project/:address',
        element: <Project />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
    ],
  },
]);

function App() {
  return (
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  );
}

export default App;
