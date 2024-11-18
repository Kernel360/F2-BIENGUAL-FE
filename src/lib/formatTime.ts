// 시간을 mm:ss 형식으로 변환하는 함수
export const formatTime = (time: number | null) => {
  if (time === null) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export function convertTime(seconds: number) {
  // 분과 초로 나눔
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // 두 자릿수로 맞추기
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}
