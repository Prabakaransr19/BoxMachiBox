'use client';

import { useEffect } from 'react';

export function ApiWarmer() {
    useEffect(() => {
        // Pre-warm API on site load
        const warmUpAPI = async () => {
            try {
                await fetch('https://boxmachibox.onrender.com/', {
                    signal: AbortSignal.timeout(5000)
                });
                console.log('✅ API pre-warmed');
            } catch {
                console.log('⏳ API warming up...');
            }
        };

        warmUpAPI();

        // Keepalive - ping every 10 mins
        const keepAlive = setInterval(() => {
            fetch('https://boxmachibox.onrender.com/').catch(() => { });
        }, 10 * 60 * 1000);

        return () => clearInterval(keepAlive);
    }, []);

    return null;
}
