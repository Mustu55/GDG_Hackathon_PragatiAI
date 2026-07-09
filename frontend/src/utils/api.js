// API Utility for Frontend
const BASE_URL = import.meta.env.VITE_API_URL || '';

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

  const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const url = endpoint.startsWith('http') ? endpoint : `${cleanBaseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json();
  } else {
    data = { message: await response.text() }; // Fallback to text for non-JSON errors like 404/405 pages
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `API Request Failed with status ${response.status}`);
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
