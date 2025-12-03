import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Make Pusher available globally (required by Echo)
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<any>;
    }
}

window.Pusher = Pusher;

// Get Pusher config from meta tags (set in blade template)
const getPusherConfig = () => {
    const key = document.querySelector('meta[name="pusher-key"]')?.getAttribute('content');
    const cluster = document.querySelector('meta[name="pusher-cluster"]')?.getAttribute('content');
    
    return { key, cluster };
};

// Create and configure Echo instance
const createEcho = () => {
    const { key, cluster } = getPusherConfig();
    
    if (!key || !cluster) {
        console.warn('Pusher configuration not found. Real-time features will be disabled.');
        return null;
    }

    const echo = new Echo({
        broadcaster: 'pusher',
        key: key,
        cluster: cluster,
        forceTLS: true,
        authorizer: (channel: { name: string }) => ({
            authorize: (socketId: string, callback: (error: boolean, data: any) => void) => {
                fetch('/api/broadcasting/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        socket_id: socketId,
                        channel_name: channel.name,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        callback(false, data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            },
        }),
    });

    window.Echo = echo;
    return echo;
};

// Singleton instance
let echoInstance: Echo<any> | null = null;

export const getEcho = (): Echo<any> | null => {
    if (!echoInstance) {
        echoInstance = createEcho();
    }
    return echoInstance;
};

export default getEcho;

