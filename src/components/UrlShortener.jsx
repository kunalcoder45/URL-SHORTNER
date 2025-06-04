import React, { useState, useRef, useEffect } from 'react';
import { shortenUrl } from '../api';
import { isValidUrl, formatUrl } from '../utils/validation';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  // Reset copied state after 2 seconds
  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValid(true); // Reset validation on change
    setError(''); // Clear any previous errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setShortUrl('');
    
    // Format and validate URL
    const formattedUrl = formatUrl(url);
    
    if (!isValidUrl(formattedUrl)) {
      setIsValid(false);
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Call API to shorten URL
      const result = await shortenUrl(formattedUrl);
      setShortUrl(result);
      
      // Focus on result for easy copying
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.select();
        }
      }, 100);
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy shortened URL to clipboard
  const copyToClipboard = () => {
    if (shortUrl && resultRef.current) {
      resultRef.current.select();
      document.execCommand('copy');
      setCopied(true);
    }
  };

  // Clear all fields and reset state
  const handleClear = () => {
    setUrl('');
    setShortUrl('');
    setError('');
    setIsValid(true);
    setCopied(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="url-shortener">
      <div className="shortener-container">
        <div className="shortener-header">
          <div className="shortener-title">
            <h1>URL Shortener</h1>
            <p>Shorten your long URLs into compact links</p>
          </div>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="shortener-form">
          <div className={`input-group ${!isValid ? 'input-error' : ''}`}>
            <input
              ref={inputRef}
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="Enter your long URL here..."
              className="url-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="shorten-button"
              disabled={isLoading || !url.trim()}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                'Shorten'
              )}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </form>

        {/* Results Section */}
        {shortUrl && (
          <div className="result-container">
            <h2>Your shortened URL</h2>
            <div className="result-group">
              <input
                ref={resultRef}
                type="text"
                value={shortUrl}
                readOnly
                className="result-input"
              />
              <button 
                onClick={copyToClipboard} 
                className="copy-button"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button onClick={handleClear} className="clear-button">
              Create New
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortener;
