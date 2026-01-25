import { auth } from '../../firebase';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Gets the current Firebase ID token for the authenticated user
 * This token is used to authenticate API requests to the backend
 */
export async function getAuthToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  
  try {
    // Get the ID token from Firebase
    // forceRefresh: false will use cached token if not expired
    const token = await user.getIdToken(false);
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * Creates headers with Firebase authentication token
 * Use this for all authenticated API requests
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const token = await getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Makes an authenticated API request
 * Automatically includes the Firebase auth token in the Authorization header
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = await getAuthHeaders();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  
  // If unauthorized, the token might be expired - try refreshing
  if (response.status === 401) {
    // Force refresh the token
    const user = auth.currentUser;
    if (user) {
      try {
        const newToken = await user.getIdToken(true); // forceRefresh: true
        const newHeaders = {
          ...headers,
          'Authorization': `Bearer ${newToken}`,
        };
        
        // Retry the request with the new token
        return await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: {
            ...newHeaders,
            ...options.headers,
          },
        });
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
  }
  
  return response;
}
