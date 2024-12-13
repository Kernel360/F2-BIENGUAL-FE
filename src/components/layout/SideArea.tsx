'use client';

import React from 'react';

import LearningTracker from './side/LearningTracker';

export default function SideArea() {
  return (
    <div className="hidden md:block  w-[300px] py-[60px]">
      <LearningTracker />
    </div>
  );
}
