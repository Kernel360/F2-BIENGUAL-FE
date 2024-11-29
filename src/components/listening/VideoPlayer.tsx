'use client';

import {
  useState,
  useEffect,
  forwardRef,
  SetStateAction,
  MutableRefObject,
} from 'react';

import ReactPlayer from 'react-player';

import ControlBar from './ControlBar';
import { Card, CardContent } from '../ui/card';

interface VideoPlayerProps {
  videoUrl: string;
  setCurrentTime: React.Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<SetStateAction<boolean>>;
  onProgress: (playedSeconds: number) => void;
}

const VideoPlayer = forwardRef<ReactPlayer, VideoPlayerProps>(
  function VideoPlayer(
    {
      videoUrl,
      setCurrentTime,
      isPlaying,
      setIsPlaying,
      onProgress,
    }: VideoPlayerProps,
    playerRef,
  ) {
    const [mounted, setMounted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [playbackRate, setPlayBackRate] = useState(1);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleProgress = (state: { playedSeconds: number }) => {
      setCurrentTime(state.playedSeconds);
      onProgress(state.playedSeconds);
    };

    const handlePlayPause = () => {
      setIsPlaying((prev) => !prev);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
    };

    const handleSeek = (seconds: number) => {
      if (playerRef && 'current' in playerRef && playerRef.current) {
        (playerRef as MutableRefObject<ReactPlayer>).current.seekTo(
          (playerRef.current.getCurrentTime() || 0) + seconds,
          'seconds',
        );
      }
    };

    const BasicControlBarProps = {
      handlePlayPause,
      handleVolumeChange,
      handleSeekForward: () => handleSeek(10),
      handleSeekBackward: () => handleSeek(-10),
      isPlaying,
      volume,
      setVolume,
      playbackRate,
      setPlayBackRate,
    };

    // if (!mounted) return null;

    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full aspect-video">
              {mounted ? (
                <>
                  <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    playing={isPlaying}
                    width="100%"
                    height="100%"
                    onPlay={() => setIsPlaying(true)}
                    onStart={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onProgress={handleProgress}
                    volume={volume}
                    controls={false}
                    playbackRate={playbackRate}
                    progressInterval={100}
                    className="absolute top-0 left-0"
                  />
                  <div className="absolute bottom-0 left-0 right-0">
                    <ControlBar
                      playerRef={playerRef}
                      BasicControlBarProps={BasicControlBarProps}
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  Loading...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

export default VideoPlayer;
