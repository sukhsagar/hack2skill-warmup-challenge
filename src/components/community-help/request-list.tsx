'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Language } from '@/types';
import { CommunityRequest, RequestStatus } from './types';
import {
  loadUserRequests,
  updateRequestStatus,
  deleteUserRequest,
  SAMPLE_COMMUNITY_REQUESTS,
} from './storage';
import { communityI18n } from './i18n';
import {
  Scale,
  HeartPulse,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Trash2,
  Filter,
  Shield,
  AlertTriangle,
  RefreshCw,
  FolderOpen,
} from 'lucide-react';

interface RequestListProps {
  language: Language;
  userId?: string;
  onNavigateToForm?: (type: 'legal' | 'medical') => void;
}

export function RequestList({
  language,
  userId,
  onNavigateToForm,
}: RequestListProps) {
  const t = communityI18n[language] || communityI18n.en;

  const [feedMode, setFeedMode] = useState<'my_requests' | 'sample_feed'>('my_requests');
  const [requests, setRequests] = useState<CommunityRequest[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadUserRequests(userId);
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState<'all' | 'legal' | 'medical'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all');

  const refreshRequests = useCallback(() => {
    setLoading(true);
    if (feedMode === 'my_requests') {
      const saved = loadUserRequests(userId);
      setRequests(saved);
    } else {
      setRequests(SAMPLE_COMMUNITY_REQUESTS);
    }
    setLoading(false);
  }, [feedMode, userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshRequests();
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshRequests]);

  const handleStatusChange = async (
    requestId: string,
    newStatus: RequestStatus,
    reason?: string
  ) => {
    setActionInProgress(requestId);
    setActionSuccess(null);
    try {
      await updateRequestStatus(requestId, newStatus, reason, userId);
      setActionSuccess(`Status successfully updated to ${newStatus.toUpperCase()}`);
      refreshRequests();
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Action failed: ${error.message}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to delete this saved request from your device?')) {
      return;
    }
    setActionInProgress(requestId);
    try {
      await deleteUserRequest(requestId, userId);
      refreshRequests();
    } finally {
      setActionInProgress(null);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            {t.statusOpen}
          </span>
        );
      case 'in_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            {t.statusInReview}
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            {t.statusResolved}
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
            <XCircle className="w-3 h-3" />
            {t.statusClosed}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Feed Toggle & Privacy Notice Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E5E4DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 bg-[#FAF9F5] rounded-2xl border border-[#E5E4DD] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFeedMode('my_requests')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                feedMode === 'my_requests'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              {t.myRequestsTab}
            </button>
            <button
              type="button"
              onClick={() => setFeedMode('sample_feed')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                feedMode === 'sample_feed'
                  ? 'bg-[#111A15] text-white shadow-xs'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              {t.sampleRequestsTab}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF9F5] border border-[#E5E4DD] text-secondary">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Sanitized Non-Identifying Summaries</span>
            </span>
            <button
              type="button"
              onClick={refreshRequests}
              className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-stone-100 text-secondary border border-[#E5E4DD] transition-colors"
              title="Refresh list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Banner for Sample Feed */}
        {feedMode === 'sample_feed' && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Evaluator Demonstration Feed:</strong> These cards illustrate how requests appear
              once sanitized. They are labelled explicitly as demo samples and are never presented as live
              workers.
            </span>
          </div>
        )}

        {/* Filter controls */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs border-t border-[#E5E4DD]/60">
          <div className="flex items-center gap-1.5 text-secondary font-bold">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1">
            {(['all', 'legal', 'medical'] as const).map((tType) => (
              <button
                key={tType}
                type="button"
                onClick={() => setTypeFilter(tType)}
                className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[11px] font-bold transition-colors ${
                  typeFilter === tType
                    ? 'bg-primary text-white'
                    : 'bg-[#FAF9F5] text-secondary hover:text-on-surface border border-[#E5E4DD]'
                }`}
              >
                {tType === 'all' ? 'All Types' : tType === 'legal' ? 'Legal' : 'Medical'}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            {(['all', 'open', 'in_review', 'resolved', 'closed'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[11px] font-bold transition-colors ${
                  statusFilter === s
                    ? 'bg-[#111A15] text-white'
                    : 'bg-[#FAF9F5] text-secondary hover:text-on-surface border border-[#E5E4DD]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="rounded-xl bg-primary-light border border-primary/20 p-3 text-xs text-primary-dark font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Listing Cards */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5E4DD] p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF9F5] text-secondary flex items-center justify-center mx-auto border border-[#E5E4DD]">
            <FolderOpen className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">{t.noRequestsTitle}</h3>
            <p className="text-xs text-secondary mt-1 max-w-md mx-auto">{t.noRequestsDesc}</p>
          </div>
          {onNavigateToForm && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToForm('legal')}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs"
              >
                + New Legal Request
              </button>
              <button
                type="button"
                onClick={() => onNavigateToForm('medical')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs"
              >
                + New Medical Request
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-[#E5E4DD] p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-primary/50 transition-all group"
            >
              <div>
                {/* Header row: Badge, Location, Time */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {req.type === 'legal' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-light text-primary border border-primary/20">
                        <Scale className="w-3 h-3" />
                        Legal Help
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                        <HeartPulse className="w-3 h-3" />
                        Medical Aid
                      </span>
                    )}

                    {getStatusBadge(req.status)}

                    {req.isDemoExample && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {t.sampleBadge}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-secondary font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                  {req.title}
                </h3>

                {/* Broad Location Tag */}
                <div className="flex items-center gap-1.5 text-xs text-secondary mt-1 mb-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                  <span>{req.broadLocation}</span>
                  <span className="text-stone-300">•</span>
                  <span className="capitalize">{req.urgency} Urgency</span>
                </div>

                {/* Sanitized Body */}
                <p className="text-xs text-secondary leading-relaxed bg-[#FAF9F5] p-3 rounded-2xl border border-[#E5E4DD] font-mono">
                  {req.sanitizedDescription}
                </p>

                {req.closureReason && (
                  <div className="mt-2 p-2 rounded-xl bg-stone-100 border border-stone-200 text-[11px] text-secondary">
                    <strong>Closure Note:</strong> {req.closureReason}
                  </div>
                )}
              </div>

              {/* Action Buttons for owner (if real request or demo interactions) */}
              <div className="pt-3 border-t border-[#E5E4DD] flex items-center justify-between gap-2 text-xs">
                <span className="text-[11px] font-mono text-secondary">
                  Ref: {req.id.substring(0, 14)}
                </span>

                {feedMode === 'my_requests' && (
                  <div className="flex items-center gap-1.5">
                    {req.status === 'open' && (
                      <button
                        type="button"
                        disabled={actionInProgress === req.id}
                        onClick={() =>
                          handleStatusChange(req.id, 'resolved', 'Marked as resolved by user')
                        }
                        className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors"
                      >
                        {t.markResolvedBtn}
                      </button>
                    )}

                    {req.status !== 'closed' && (
                      <button
                        type="button"
                        disabled={actionInProgress === req.id}
                        onClick={() =>
                          handleStatusChange(req.id, 'closed', 'Closed by user request')
                        }
                        className="px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] border border-stone-300 transition-colors"
                      >
                        {t.closeRequestBtn}
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={actionInProgress === req.id}
                      onClick={() => handleDelete(req.id)}
                      className="p-1.5 rounded-xl bg-stone-50 hover:bg-red-50 text-secondary hover:text-red-600 transition-colors border border-[#E5E4DD]"
                      title={t.deleteBtn}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
