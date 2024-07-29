import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([

    {
        path: '/',
        lazy: () => import('../pages/HomePage').then(module => ({ Component: module.default })),
    },
    {
        path: '/my-newsfeed',
        lazy: () => import('../pages/PersonalizedFeed').then(module => ({ Component: module.default })),
    }
]);

export default router;