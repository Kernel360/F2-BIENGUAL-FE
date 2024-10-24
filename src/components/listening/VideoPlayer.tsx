/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

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
}

const VideoPlayer = forwardRef<ReactPlayer, VideoPlayerProps>(
  function VideoPlayer(
    { videoUrl, setCurrentTime, isPlaying, setIsPlaying }: VideoPlayerProps,
    playerRef,
  ) {
    const [mounted, setMounted] = useState(false); // 추가: 마운트 상태 확인
    const [volume, setVolume] = useState(0.5);
    const [playbackRate, setPlayBackRate] = useState(1);

    useEffect(() => {
      setMounted(true); // 컴포넌트가 클라이언트에서 마운트되었음을 표시
    }, []);

    const handleProgress = (state: { playedSeconds: number }) => {
      setCurrentTime(state.playedSeconds);
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
      setPlayBackRate,
    };

    // 클라이언트에서만 렌더링되도록 조건부 렌더링
    if (!mounted) return null;

    return (
      <div className="container mx-auto py-5 grid grid-cols-3 gap-4">
        {/* 비디오 플레이어 */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0 h-[400px] relative rounded-xl overflow-hidden">
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
              />
              <ControlBar
                playerRef={playerRef}
                BasicControlBarProps={BasicControlBarProps}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
);

export default VideoPlayer;
