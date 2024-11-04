'use client';

import Calendar from '@/components/common/DashboardCalendar';

export default function Dashboardpage() {
  return (
    <div className="border p-3">
      <span className="">월간학습</span>
      <Calendar />
    </div>
  );
}
