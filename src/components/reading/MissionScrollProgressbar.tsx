import { useEffect } from 'react';

import { useUpdateMissionStatus } from '@/api/hooks/useMission';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { MissionStatus } from '@/types/Mission';

import ScrollProgressBar from '../common/ScrollProgressBar';

export default function MissionScrollProgressbar({
  missionStatus,
}: {
  missionStatus: MissionStatus | undefined;
}) {
  const scrollPercent = useScrollProgress();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  useEffect(() => {
    if (scrollPercent >= 90 && missionStatus && !missionStatus.oneContent) {
      // 미션 완료 요청을 한 번만 보냄
      updateMissionStatus({
        oneContent: true,
      });
    }
  }, [scrollPercent, missionStatus, updateMissionStatus]);

  return <ScrollProgressBar scrollPercent={scrollPercent} />;
}
