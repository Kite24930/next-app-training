import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { GamificationProvider } from '@/contexts/GamificationContext';

createInertiaApp({
    title: (title) => title ? `${title} - Next.js Invaders` : 'Next.js Invaders',
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <GamificationProvider>
                <App {...props} />
            </GamificationProvider>
        );
    },
});
