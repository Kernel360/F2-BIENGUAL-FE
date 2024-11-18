'use client';

/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { ForwardedRef, MutableRefObject, useState } from 'react';

import { Volume2, Play, Rewind, FastForward, Pause, Gauge } from 'lucide-react';
import ReactPlayer from 'react-player';

import { formatTime } from '@/lib/formatTime';

interface BasicControlBarProps {
  handlePlayPause: () => void;
  handleSeekBackward: () => void;
  handleSeekForward: () => void;
  isPlaying: boolean;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  setPlayBackRate: (rate: number) => void;
}

interface ControlBarProps {
  playerRef: ForwardedRef<ReactPlayer>;
  BasicControlBarProps: BasicControlBarProps;
}

export default function ControlBar({
  playerRef,
  BasicControlBarProps,
}: ControlBarProps) {
  const [isDragging, setIsDragging] = useState(false);

  const {
    handlePlayPause,
    isPlaying,
    handleSeekBackward,
    handleSeekForward,
    handleVolumeChange,
    volume,
    setPlayBackRate,
  } = BasicControlBarProps;

  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    action: 'down' | 'up' | 'move',
  ) => {
    if (!playerRef || !(playerRef as MutableRefObject<ReactPlayer>).current)
      return;

    const currentPlayer = (playerRef as MutableRefObject<ReactPlayer>).current;

    if (action === 'down') {
      setIsDragging(true);
    } else if (action === 'up') {
      setIsDragging(false);
      const progressBar = e.currentTarget;
      const progressBarRect = progressBar.getBoundingClientRect();
      const newTime =
        ((e.clientX - progressBarRect.left) / progressBarRect.width) *
        currentPlayer.getDuration();
      currentPlayer.seekTo(newTime);
    }
  };
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);

  const handleShowPlaybackRate = () => {
    setShowPlaybackRate(!showPlaybackRate);
  };

  return (
    <div className="absolute w-full bottom-[-5px] bg-gradient-to-b from-transparent to-black">
      {/* progressBar */}
      <div
        className="relative w-full h-2 bg-[rgba(255,255,255,0.3)] cursor-pointer"
        onMouseDown={(e) => handleMouseEvent(e, 'down')}
        onMouseMove={(e) => isDragging && handleMouseEvent(e, 'move')}
        onMouseUp={(e) => handleMouseEvent(e, 'up')}
        onMouseLeave={() => setIsDragging(false)} // 드래그 상태 해제
        role="progressbar"
        aria-label="Progress"
      >
        <div
          className="h-full bg-violet-400 rounded-l transition-all duration-200 ease"
          style={{
            width: `${
              playerRef &&
              (playerRef as MutableRefObject<ReactPlayer>).current &&
              (
                playerRef as MutableRefObject<ReactPlayer>
              ).current.getCurrentTime() &&
              (playerRef as MutableRefObject<ReactPlayer>).current.getDuration()
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  ((
                    playerRef as MutableRefObject<ReactPlayer>
                  ).current.getCurrentTime() /
                    (
                      playerRef as MutableRefObject<ReactPlayer>
                    ).current.getDuration()) *
                  100
                : 0
            }%`,
          }}
        ></div>
      </div>

      <div className="w-full h-[50px] flex justify-between items-center px-[30px] text-white box-border">
        <div className="flex flex-row items-center gap-2 ">
          {/* 볼륨 슬라이더 */}
          <div className="flex items-center mr-2">
            <Volume2 className="text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="w-[60px] h-[5px] rounded-[15px] cursor-pointer accent-white"
            />
          </div>
          {/* 진행시간 박스 */}
          <span className="text-sm">
            {`${formatTime(
              (
                playerRef as MutableRefObject<ReactPlayer>
              ).current?.getCurrentTime() ?? 0,
            )} / ${formatTime(
              (
                playerRef as MutableRefObject<ReactPlayer>
              ).current?.getDuration() ?? 0,
            )}`}
          </span>
        </div>

        {/* 재생 조절 버튼 */}
        <div className="absolute right-[50%] transform translate-x-[50%] flex gap-[10px] cursor-pointer">
          <Rewind className="text-white" onClick={handleSeekBackward} />
          {isPlaying ? (
            <Pause className="text-white" onClick={handlePlayPause} />
          ) : (
            <Play className="text-white" onClick={handlePlayPause} />
          )}
          <FastForward className="text-white" onClick={handleSeekForward} />
        </div>

        {/* 우측 컨트롤바 */}
        <div className="flex flex-row items-center relative cursor-pointer">
          {/* 배속 조절 버튼 */}
          <Gauge className="text-white" onClick={handleShowPlaybackRate} />
          {showPlaybackRate && (
            <div className="absolute bottom-full bg-[rgba(0,0,0,0.5)] text-white rounded-[4px]">
              {[0.5, 0.75, 1, 1.2, 1.5].map((rate) => (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label
                  key={rate}
                  className="block px-[12px] py-[8px] text-sm cursor-pointer transition-colors duration-200 ease-in-out hover:bg-black rounded"
                >
                  <input
                    type="radio"
                    name="playbackRate"
                    value={rate}
                    onClick={() => setPlayBackRate(rate)}
                    className="hidden"
                  />
                  {rate}x
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
