'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface PresetScenariosProps {
  onSelectScenario: (scenario: 'payout' | 'penalty' | 'suspension') => void;
}

export function PresetScenarios({ onSelectScenario }: PresetScenariosProps) {
  return (
    <div className="p-4 rounded-xl bg-primary-light/60 border border-primary/20">
      <span className="text-xs font-bold text-primary flex items-center gap-1.5 mb-2.5">
        <Sparkles className="w-4 h-4 text-primary" />
        1-Click Demo Scenarios (Pre-fill Form):
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectScenario('payout')}
          className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
        >
          Swiggy Delayed Payout (₹2,450)
        </button>
        <button
          type="button"
          onClick={() => onSelectScenario('penalty')}
          className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
        >
          Zomato Cancellation Penalty (₹500)
        </button>
        <button
          type="button"
          onClick={() => onSelectScenario('suspension')}
          className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-primary hover:text-white text-on-surface border border-[#E5E4DD] font-semibold transition-all shadow-xs"
        >
          Uber ID Deactivation Appeal
        </button>
      </div>
    </div>
  );
}
