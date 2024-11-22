'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import useUserLoginStatus from '@/api/hooks/useUserLoginStatus';
import LogInOutButton from '@/components/common/LogInOutButton';
import Modal from '@/components/common/Modal';
import CategoryDistributionPanel from '@/components/dashboard/CategoryDistributionPanel';
import CurrentPointsPanel from '@/components/dashboard/CurrentPointsPanel';
import MissionCalendar from '@/components/dashboard/MissionCalendar';
import QuizAccuracyPanel from '@/components/dashboard/QuizAccuracyPanel';
import RecentLearningPanel from '@/components/dashboard/RecentLearningPanel';

export default function DashboardPage() {
  const { data: isLoginData } = useUserLoginStatus();
  const isLogin = isLoginData?.data; // 로그인 상태 확인
  const [showLoginModal, setShowLoginModal] = useState(!isLogin);

  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* TODO(@smosco): api 요청 하나 잘못 처리한다고 다 뻗어버리는 문제 해결할 것 */}
        <RecentLearningPanel />
        <CurrentPointsPanel />
        {/* TODO(@smosco): 로그아웃 했을 때 미션 캘린더 api 요청 못하도록 막아야함 */}
        <MissionCalendar />
        <CategoryDistributionPanel />
        <QuizAccuracyPanel />
      </div>

      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            router.replace('/');
          }}
          title="로그인이 필요합니다."
          description="이 기능을 이용하려면 로그인이 필요해요! "
        >
          <div className="flex justify-center gap-4 mt-4">
            <LogInOutButton />
          </div>
        </Modal>
      )}
    </div>
  );
}
