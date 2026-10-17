'use client';

import React from 'react';
import { MainTab } from './types';
import { MessageSquare, Briefcase, Users, User } from 'lucide-react';

interface BottomNavigationProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  draftsCount?: number;
}

export function BottomNavigation({
  currentTab,
  onSelectTab,
  draftsCount = 0,
}: BottomNavigationProps) {
  const tabs = [
    {
      id: 'chat' as MainTab,
      label: 'Chat',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: 'work' as MainTab,
      label: 'Appeals',
      icon: <Briefcase className="w-5 h-5" />,
      badge: draftsCount > 0 ? draftsCount : undefined,
    },
    {
      id: 'community' as MainTab,
      label: 'Community',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'profile' as MainTab,
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#DDE5DD] shadow-lg pb-safe"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-around h-16 sm:h-18 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-label={tab.label}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-all relative select-none cursor-pointer ${
                isActive
                  ? 'text-[#0B3328] font-extrabold'
                  : 'text-[#64736A] hover:text-[#17251F] font-semibold'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 rounded-full bg-[#B8EF43]" />
              )}

              <div className="relative">
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive ? 'bg-[#EBF7EB] text-[#0B3328]' : ''
                  }`}
                >
                  {tab.icon}
                </div>

                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-[#0B3328] text-white ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[12px] sm:text-[13px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
