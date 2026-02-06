import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

/**
 * OptimizedVideo - A performance-optimized video component
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Preload strategy (only loads when in viewport)
 * - Poster image support
 * - Loading placeholder
 * - Error handling
 */
const OptimizedVideo = forwardRef(({
  src,
  poster,
  className = '',
  style = {},
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  preload = 'none',
  onEnded,
  onLoad,
  onError,
  onCanPlay,
  eager = false,
  rootMargin = '200px',
  ...props
}, ref) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(eager);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Expose video element methods via ref
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    load: () => videoRef.current?.load(),
    get currentTime() { return videoRef.current?.currentTime; },
    set currentTime(val) { if (videoRef.current) videoRef.current.currentTime = val; },
    get paused() { return videoRef.current?.paused; },
    get duration() { return videoRef.current?.duration; },
    get videoElement() { return videoRef.current; }
  }));

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (eager || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: rootMargin,
        threshold: 0.01
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [eager, rootMargin]);

  // Auto-play when in view and loaded
  useEffect(() => {
    if (inView && loaded && autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }
  }, [inView, loaded, autoPlay]);

  const handleCanPlay = (e) => {
    setLoaded(true);
    onCanPlay?.(e);
  };

  const handleLoadedData = (e) => {
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const showPlaceholder = !loaded && !error;

  return (
    <div
      ref={containerRef}
      className={`optimized-video-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
        ...style
      }}
    >
      {/* Poster image while loading */}
      {showPlaceholder && poster && (
        <img
          src={poster}
          alt="Video thumbnail"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      )}

      {/* Loading spinner */}
      {showPlaceholder && !poster && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            zIndex: 1
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTopColor: '#3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a2e',
            color: '#666',
            zIndex: 2
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
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" />
          </svg>
          <span style={{ marginTop: '8px', fontSize: '14px' }}>Video unavailable</span>
        </div>
      )}

      {/* Actual video element */}
      {inView && !error && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload={loaded ? 'auto' : 'metadata'}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onEnded={onEnded}
          onPlay={handlePlay}
          onPause={handlePause}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          {...props}
        />
      )}

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
