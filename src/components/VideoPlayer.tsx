'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/app/providers';
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX, 
  FiMaximize, 
  FiMinimize,
  FiSettings,
  FiType 
} from 'react-icons/fi';

type VideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  subtitles?: {
    lang: string;
    label: string;
    src: string;
  }[];
};

/**
 * Multilingual video player component for course lessons
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  className = '',
  subtitles = [],
}: VideoPlayerProps) {
  const { locale, isRTL } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);
  const [showSubtitles, setShowSubtitles] = useState(true);
  
  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeout);
      setShowControls(true);
      
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const handleMouseMove = () => resetTimeout();
    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };
    
    if (playerRef.current) {
      playerRef.current.addEventListener('mousemove', handleMouseMove);
      playerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    resetTimeout();
    
    return () => {
      clearTimeout(timeout);
      if (playerRef.current) {
        playerRef.current.removeEventListener('mousemove', handleMouseMove);
        playerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isPlaying]);
  
  // Set default subtitle based on user's locale
  useEffect(() => {
    const matchingSubtitle = subtitles.find(sub => sub.lang === locale);
    if (matchingSubtitle) {
      setSelectedSubtitle(matchingSubtitle.lang);
    } else if (subtitles.length > 0) {
      setSelectedSubtitle(subtitles[0].lang);
    }
  }, [locale, subtitles]);
  
  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleVolumeChange = () => setVolume(video.volume);
    const handleEnded = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Playback control functions
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (!videoRef.current) return;
    
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };
  
  const changeSubtitle = (lang: string | null) => {
    setSelectedSubtitle(lang);
    setShowSettings(false);
  };
  
  // Format time (seconds -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Translations
  const translations: Record<string, Record<string, string>> = {
    en: {
      play: 'Play',
      pause: 'Pause',
      mute: 'Mute',
      unmute: 'Unmute',
      fullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      settings: 'Settings',
      speed: 'Playback speed',
      subtitles: 'Subtitles',
      off: 'Off',
      normal: 'Normal',
    },
    fr: {
      play: 'Lire',
      pause: 'Pause',
      mute: 'Couper le son',
      unmute: 'Activer le son',
      fullscreen: 'Plein écran',
      exitFullscreen: 'Quitter le plein écran',
      settings: 'Paramètres',
      speed: 'Vitesse de lecture',
      subtitles: 'Sous-titres',
      off: 'Désactivé',
      normal: 'Normal',
    },
    ar: {
      play: 'تشغيل',
      pause: 'إيقاف مؤقت',
      mute: 'كتم الصوت',
      unmute: 'تشغيل الصوت',
      fullscreen: 'ملء الشاشة',
      exitFullscreen: 'الخروج من ملء الشاشة',
      settings: 'الإعدادات',
      speed: 'سرعة التشغيل',
      subtitles: 'الترجمة',
      off: 'إيقاف',
      normal: 'عادي',
    },
  };
  
  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };
  
  return (
    <div 
      ref={playerRef}
      className={`relative overflow-hidden rounded-lg bg-black ${className}`}
      dir="ltr" // Video players are always LTR
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        autoPlay={autoPlay}
        onClick={togglePlay}
      >
        {/* Add subtitle tracks if available */}
        {subtitles.map((subtitle) => (
          <track
            key={subtitle.lang}
            kind="subtitles"
            src={subtitle.src}
            srcLang={subtitle.lang}
            label={subtitle.label}
            default={subtitle.lang === selectedSubtitle}
          />
        ))}
      </video>
      
      {/* Video overlay for play/pause on click */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
      ></div>
      
      {/* Play/Pause big button overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-blue/80 text-white rounded-full p-6 hover:bg-blue transition"
            onClick={togglePlay}
            aria-label={isPlaying ? t('pause') : t('play')}
          >
            <FiPlay size={24} />
          </button>
        </div>
      )}
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-1 w-full bg-gray-600 cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-blue to-green relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-blue rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:text-blue"
              onClick={togglePlay}
              aria-label={isPlaying ? t('pause') : t('play')}
            >
              {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
            </button>
            
            <div className="flex items-center">
              <button
                className="text-white hover:text-blue mr-2"
                onClick={toggleMute}
                aria-label={isMuted ? t('unmute') : t('mute')}
              >
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 accent-blue"
              />
            </div>
            
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          {/* Right controls */}
          <div className="flex items-center space-x-4">
            {/* Subtitles button */}
            {subtitles.length > 0 && (
              <button
                className={`text-white hover:text-blue ${showSubtitles ? 'text-blue' : ''}`}
                onClick={() => setShowSubtitles(!showSubtitles)}
                aria-label={t('subtitles')}
              >
                <FiType size={18} />
              </button>
            )}
            
            {/* Settings button */}
            <div className="relative">
              <button
                className="text-white hover:text-blue"
                onClick={() => setShowSettings(!showSettings)}
                aria-label={t('settings')}
              >
                <FiSettings size={18} />
              </button>
              
              {showSettings && (
                <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg p-2 w-48 shadow-lg">
                  {/* Playback speed */}
                  <div className="mb-2">
                    <div className="text-white text-xs font-medium mb-1 px-2">{t('speed')}</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          className={`text-xs py-1 px-2 rounded ${
                            playbackRate === rate
                              ? 'bg-blue text-white'
                              : 'text-white hover:bg-gray-700'
                          }`}
                          onClick={() => changePlaybackRate(rate)}
                        >
                          {rate === 1 ? t('normal') : `${rate}x`}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Subtitles */}
                  {subtitles.length > 0 && (
                    <div>
                      <div className="text-white text-xs font-medium mb-1 px-2">{t('subtitles')}</div>
                      <div className="flex flex-col">
                        <button
                          className={`text-xs py-1 px-2 rounded text-left ${
                            selectedSubtitle === null
                              ? 'bg-blue text-white'
                              : 'text-white hover:bg-gray-700'
                          }`}
                          onClick={() => changeSubtitle(null)}
                        >
                          {t('off')}
                        </button>
                        
                        {subtitles.map((subtitle) => (
                          <button
                            key={subtitle.lang}
                            className={`text-xs py-1 px-2 rounded text-left ${
                              selectedSubtitle === subtitle.lang
                                ? 'bg-blue text-white'
                                : 'text-white hover:bg-gray-700'
                            }`}
                            onClick={() => changeSubtitle(subtitle.lang)}
                          >
                            {subtitle.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Fullscreen button */}
            <button
              className="text-white hover:text-blue"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? t('exitFullscreen') : t('fullscreen')}
            >
              {isFullscreen ? <FiMinimize size={18} /> : <FiMaximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 