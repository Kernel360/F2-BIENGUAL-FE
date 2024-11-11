'use client';

import React from 'react';

import LearningTracker from './side/LearningTracker';

export default function SideArea() {
  return (
    <div className="hidden md:block h-fit w-[260px] ml-[50px] py-[60px]">
      <LearningTracker />
    </div>
  );
}
