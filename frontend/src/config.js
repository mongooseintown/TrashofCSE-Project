export const getApiUrl = (path) => {
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}${path}`;
  }
  
  const hostname = window.location.hostname;
  
  // If running locally or on a local network (e.g. Wi-Fi sharing via 192.168.x.x)
  if (
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname.startsWith('192.168.') || 
    hostname.startsWith('10.') || 
    hostname.startsWith('172.')
  ) {
    return `http://${hostname}:5000${path}`;
  }
  
  // Fallback to production Render backend URL
  return `https://trashofcse-project.onrender.com${path}`;
};
