import React, { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage - A performance-optimized image component
 * Features:
 * - Lazy loading with IntersectionObserver
 * - WebP format support with fallback
 * - Loading placeholder
 * - Error handling
 */
const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  style = {},
  onLoad,
  onError,
  placeholder = null,
  eager = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(eager);
  const imgRef = useRef(null);

  // Generate WebP source if original is jpg/jpeg/png
  const webpSrc = src?.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebpVersion = /\.(jpg|jpeg|png)$/i.test(src || '');

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (eager || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [eager]);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  // Placeholder while loading
  const showPlaceholder = !loaded && !error;

  return (
    <div
      ref={imgRef}
      className={`optimized-image-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Placeholder/Loading state */}
      {showPlaceholder && (
        placeholder || (
          <div
            className="optimized-image-placeholder"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#1a1a2e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255,255,255,0.1)',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}
            />
          </div>
        )
      )}

      {/* Error state */}
      {error && (
        <div
          className="optimized-image-error"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1a1a2e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666'
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}

      {/* Actual image with picture element for WebP support */}
      {inView && !error && (
        <picture>
          {hasWebpVersion && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
            {...props}
          />
        </picture>
      )}

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
