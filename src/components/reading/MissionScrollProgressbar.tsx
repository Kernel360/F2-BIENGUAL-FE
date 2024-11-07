import { useEffect } from 'react';

import { useUpdateMissionStatus } from '@/api/hooks/useMission';
import { MissionStatus } from '@/types/Mission';

import ScrollProgressBar from '../common/ScrollProgressBar';

export default function MissionScrollProgressbar({
  scrollPercent,
  missionStatus,
}: {
  scrollPercent: number;
  missionStatus: MissionStatus | undefined;
}) {
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
