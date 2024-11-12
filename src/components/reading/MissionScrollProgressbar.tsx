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
    // TODO(@smosco): 미션 상태 확인이 답이 늦게 와서 미션 업데이트 요청을 상태 확인으로 true가 올 때까지 계속 보냄
    // 요청 보냈다는 상태를 통해서 안 보내게 만들어야 할듯
    if (scrollPercent >= 90 && missionStatus && !missionStatus.oneContent) {
      // 미션 완료 요청을 한 번만 보냄
      updateMissionStatus({
        oneContent: true,
      });
    }
  }, [scrollPercent, missionStatus, updateMissionStatus]);

  return <ScrollProgressBar scrollPercent={scrollPercent} />;
}
