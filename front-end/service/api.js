import axios from 'axios';

// Backend mounts routes under /mampyy and (when no PORT env) uses 3000 by default.
// Keep the baseURL pointing to the backend root for the front-end to call 
// endpoints like `/auth/register` (which become `/mampyy/auth/register`).
const api = axios.create({
    baseURL: "https://localhost:8443/mampyy",
    // Note: the server uses a self-signed certificate (cert.pem). In development
    // you'll need to accept the certificate in your browser for HTTPS requests to work.
});

export default api;