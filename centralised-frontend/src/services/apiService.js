import apiClient from '../apiclient/apiclient';

// Cache for API endpoints
let apiEndpoints = null;

// Function to discover API endpoints
export const discoverApiEndpoints = async () => {
  if (apiEndpoints) return apiEndpoints;
  
  try {
    const response = await apiClient.get('');
    apiEndpoints = response.data;
    return apiEndpoints;
  } catch (error) {
    console.error('Failed to discover API endpoints:', error);
    throw error;
  }
};

// Example of using discovered endpoints
export const loginWithDiscoveredEndpoint = async (email, password) => {
  try {
    const endpoints = await discoverApiEndpoints();
    const loginUrl = endpoints.authentication.login;
    
    // Extract the relative path from the full URL
    const relativePath = loginUrl.replace(apiClient.defaults.baseURL, '');
    
    const response = await apiClient.post(relativePath, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}; 