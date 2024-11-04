import { useEffect, useState } from 'react';

import {
  useFetchMissionStatus,
  useUpdateMissionStatus,
} from '@/api/hooks/useMission';
import { useScrollProgress } from '@/hooks/useScrollProgress';

import ScrollProgressBar from '../common/ScrollProgressBar';

export default function MissionScrollProgressbar() {
  const scrollPercent = useScrollProgress();
  const [isMissionCompleteSent, setIsMissionCompleteSent] = useState(false);
  const { data: missionStatus } = useFetchMissionStatus();
  const { mutate: updateMissionStatus } = useUpdateMissionStatus();

  useEffect(() => {
    if (
      scrollPercent >= 90 &&
      !isMissionCompleteSent &&
      missionStatus?.data &&
      !missionStatus?.data.oneContent
    ) {
      setIsMissionCompleteSent(true);

      // 미션 완료 요청을 한 번만 보냄
      updateMissionStatus({
        oneContent: true,
      });
    }
  }, [
    scrollPercent,
    isMissionCompleteSent,
    missionStatus,
    updateMissionStatus,
  ]);

  return <ScrollProgressBar scrollPercent={scrollPercent} />;
}
