'use client';

import React, { useState } from 'react';
import { WorkerOnboardingProfile, Language } from '@/types';
import { User, Briefcase, MapPin, Bike, Shield, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  language: Language;
  onSaveProfile: (profile: WorkerOnboardingProfile) => void;
  onSkip: () => void;
  initialProfile?: WorkerOnboardingProfile | null;
}

export function OnboardingModal({
  language,
  onSaveProfile,
  onSkip,
  initialProfile,
}: OnboardingModalProps) {
  const [workType, setWorkType] = useState<WorkerOnboardingProfile['workType']>(
    initialProfile?.workType || 'delivery'
  );
  const [primaryPlatform, setPrimaryPlatform] = useState<string>(
    initialProfile?.primaryPlatform || 'Zomato'
  );
  const [city, setCity] = useState<string>(initialProfile?.city || 'Delhi NCR');
  const [hasVehicle, setHasVehicle] = useState<boolean>(
    initialProfile ? initialProfile.hasVehicle : true
  );
  const [registeredOnEShram, setRegisteredOnEShram] = useState<boolean | 'not_sure'>(
    initialProfile ? initialProfile.registeredOnEShram : 'not_sure'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      workType,
      primaryPlatform,
      city,
      hasVehicle,
      registeredOnEShram,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E5E4DD] shadow-xl relative animate-in fade-in zoom-in-95 my-8">
        <button
          type="button"
          onClick={onSkip}
          className="absolute top-4 right-4 text-secondary hover:text-on-surface p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg">
            आ
          </div>
          <div>
            <h2 className="text-lg font-bold text-on-surface">
              {language === 'hi'
                ? 'श्रमिक प्रोफ़ाइल (वैकल्पिक)'
                : language === 'pa'
                ? 'ਕਾਮਾ ਪ੍ਰੋਫਾਈਲ (ਵਿਕਲਪਿਕ)'
                : 'Worker Profile (Optional)'}
            </h2>
            <p className="text-xs text-secondary">
              {language === 'hi'
                ? 'अपने काम के आधार पर सटीक कानूनी नियम और वास्तविक शिकायतें पाएं'
                : language === 'pa'
                ? 'ਆਪਣੇ ਕੰਮ ਦੇ ਅਧਾਰ ਤੇ ਸਹੀ ਨਿਯਮ ਪ੍ਰਾਪਤ ਕਰੋ'
                : 'Personalize rights and crowd-sourced issues for your gig sector'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Work Type */}
          <div>
            <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>What type of gig work do you do?</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'delivery', label: 'Food / Grocery Delivery' },
                { id: 'cab_driver', label: 'Cab / Auto Driver' },
                { id: 'warehouse', label: 'Warehouse / Dark Store' },
                { id: 'home_services', label: 'Home Services / Salon' },
                { id: 'daily_wage', label: 'Daily Wage / Construction' },
                { id: 'other', label: 'Other Work' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setWorkType(item.id as WorkerOnboardingProfile['workType']);
                    if (item.id === 'cab_driver') setPrimaryPlatform('Uber');
                    else if (item.id === 'delivery') setPrimaryPlatform('Zomato');
                    else if (item.id === 'warehouse') setPrimaryPlatform('Blinkit');
                    else if (item.id === 'home_services') setPrimaryPlatform('Urban Company');
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                    workType === item.id
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-[#E5E4DD] bg-[#FAF9F5] text-secondary hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Platform & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>Primary App / Platform</span>
              </label>
              <select
                value={primaryPlatform}
                onChange={(e) => setPrimaryPlatform(e.target.value)}
                className="w-full p-2.5 text-sm rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary text-on-surface font-medium"
              >
                <option value="Zomato">Zomato</option>
                <option value="Swiggy">Swiggy</option>
                <option value="Uber">Uber</option>
                <option value="Ola">Ola</option>
                <option value="Zepto">Zepto</option>
                <option value="Blinkit">Blinkit</option>
                <option value="Rapido">Rapido</option>
                <option value="Urban Company">Urban Company</option>
                <option value="Porter">Porter</option>
                <option value="Amazon Flex">Amazon Flex</option>
                <option value="Independent Contractor">Independent / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>City / State</span>
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru, Delhi NCR, Mumbai"
                className="w-full p-2.5 text-sm rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary text-on-surface font-medium"
              />
            </div>
          </div>

          {/* Vehicle Ownership & e-Shram Registration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-[#E5E4DD] bg-[#FAF9F5]">
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                <Bike className="w-3.5 h-3.5 text-primary" />
                <span>Two-Wheeler / Vehicle</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHasVehicle(true)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    hasVehicle
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-secondary border-[#E5E4DD]'
                  }`}
                >
                  Yes, Own Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => setHasVehicle(false)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    !hasVehicle
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-secondary border-[#E5E4DD]'
                  }`}
                >
                  Rented / None
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-[#E5E4DD] bg-[#FAF9F5]">
              <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>e-Shram Card Registered?</span>
              </label>
              <div className="flex gap-1.5">
                {[
                  { id: true, label: 'Yes' },
                  { id: false, label: 'No' },
                  { id: 'not_sure', label: 'Not Sure' },
                ].map((item) => (
                  <button
                    key={String(item.id)}
                    type="button"
                    onClick={() =>
                      setRegisteredOnEShram(item.id as boolean | 'not_sure')
                    }
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      registeredOnEShram === item.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-secondary border-[#E5E4DD]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E5E4DD]">
            <button
              type="button"
              onClick={onSkip}
              className="text-xs text-secondary hover:text-on-surface font-semibold py-2 px-3"
            >
              Skip for now
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>Personalize My App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
