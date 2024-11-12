const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FetchOptions extends RequestInit {
  customHeaders?: Record<string, string>;
}

export const apiClient = async <T>(
  endpoint: string,
  { method = 'GET', customHeaders = {}, ...options }: FetchOptions = {},
): Promise<T> => {
  const response = await fetch(`${BASE_URL}/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
