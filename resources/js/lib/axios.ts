import axios from 'axios';

// Create a pre-configured axios instance
const api = axios.create({
    baseURL: '/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add a request interceptor to include the CSRF token
api.interceptors.request.use((config) => {
    // Get CSRF token from meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle 419 errors (CSRF token mismatch)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 419) {
            // CSRF token expired, reload the page to get a fresh token
            console.warn('CSRF token expired, reloading page...');
            window.location.reload();
            return new Promise(() => {}); // Return a pending promise to prevent further execution
        }
        return Promise.reject(error);
    }
);

export default api;

