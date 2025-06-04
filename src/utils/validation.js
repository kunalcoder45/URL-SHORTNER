/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export const isValidUrl = (url) => {
  try {
    // Check if URL is empty
    if (!url || url.trim() === '') {
      return false;
    }
    
    // Try to create a URL object - this will throw if invalid
    new URL(url);
    
    // Additional check for http/https protocol
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (error) {
    return false;
  }
};

/**
 * Formats a URL by ensuring it has a protocol
 * @param {string} url - The URL to format
 * @returns {string} - Formatted URL with protocol
 */
export const formatUrl = (url) => {
  if (!url) return '';
  
  // If URL doesn't start with a protocol, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
};
