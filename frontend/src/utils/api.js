// API Utility for Frontend
// Vite proxy (vite.config.js) forwards /api/* to http://localhost:5000
// So we use relative paths here - no BASE_URL needed

const getToken = () => localStorage.getItem('pragati_token');

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set Content-Type to application/json if we are not sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const url = endpoint.startsWith('http') ? endpoint : endpoint;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || 'API Request Failed');
  }

  return data;
};

export const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  post: (endpoint, body) => {
    return apiFetch(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  put: (endpoint, body) => {
    return apiFetch(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
  },
  delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' }),
};
