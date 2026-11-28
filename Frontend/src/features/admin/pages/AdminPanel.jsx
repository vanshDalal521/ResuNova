import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ShieldCheck, Users, FileText, Crown, Zap, MessageSquare, Map,
  Search, Trash2, ExternalLink, RefreshCw, Sparkles, LogOut,
  CheckCircle2, ArrowRight, Activity, Award
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../auth/hooks/useAuth'
import {
  fetchAdminStats,
  fetchAdminUsers,
  updateAdminUser,
  deleteAdminUser,
  fetchAdminReports,
  deleteAdminReport,
} from '../services/admin.api'
import '../style/admin.scss'

const AdminPanel = () => {
  const { user, loading: authLoading, handleLogout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('users')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [busyId, setBusyId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [planFilter, setPlanFilter] = useState('all')

  const loadAdminData = useCallback(async () => {
    try {
      setDataLoading(true)
      const [statsRes, usersRes, reportsRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminUsers(),
        fetchAdminReports(),
      ])
      setStats(statsRes.stats)
      setUsers(usersRes.users || [])
      setReports(reportsRes.reports || [])
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load admin telemetry')
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        navigate('/admin/login', { replace: true })
        return
      }
      loadAdminData()
    }
  }, [authLoading, user, navigate, loadAdminData])

  const handleTogglePro = async (targetUser) => {
    const nextPlan = targetUser.plan === 'pro' ? 'starter' : 'pro'
    const nextStatus = nextPlan === 'pro' ? 'active' : null
    try {
      setBusyId(targetUser._id)
      const res = await updateAdminUser(targetUser._id, {
        plan: nextPlan,
        subscriptionStatus: nextStatus,
      })
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUser._id ? { ...u, ...res.user } : u))
      )
      toast.success(`${targetUser.username} switched to ${nextPlan.toUpperCase()}`)
      const statsRes = await fetchAdminStats()
      setStats(statsRes.stats)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update user plan')
    } finally {
      setBusyId(null)
    }
  }

  const handleDeleteUser = async (targetUser) => {
    if (!window.confirm(`Delete user "${targetUser.username}" and all their reports?`)) return
    try {
      setBusyId(targetUser._id)
      await deleteAdminUser(targetUser._id)
      setUsers((prev) => prev.filter((u) => u._id !== targetUser._id))
      setReports((prev) => prev.filter((r) => r.user?._id !== targetUser._id))
      toast.success(`Removed ${targetUser.username}`)
      const statsRes = await fetchAdminStats()
      setStats(statsRes.stats)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete user')
    } finally {
      setBusyId(null)
    }
  }

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Delete this interview report permanently?')) return
    try {
      setBusyId(reportId)
      await deleteAdminReport(reportId)
      setReports((prev) => prev.filter((r) => r._id !== reportId))
      toast.success('Report deleted')
      const statsRes = await fetchAdminStats()
      setStats(statsRes.stats)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete report')
    } finally {
      setBusyId(null)
    }
  }

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return users.filter((u) => {
      const matchesPlan =
        planFilter === 'all' ||
        (planFilter === 'admin' && u.role === 'admin') ||
        (planFilter === 'pro' && u.plan === 'pro') ||
        (planFilter === 'starter' && u.plan === 'starter')
      const matchesQuery =
        !q ||
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      return matchesPlan && matchesQuery
    })
  }, [users, searchQuery, planFilter])

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return reports
    return reports.filter(
      (r) =>
        r.title?.toLowerCase().includes(q) ||
        r.companyName?.toLowerCase().includes(q) ||
        r.user?.username?.toLowerCase().includes(q)
    )
  }, [reports, searchQuery])

  if (authLoading || (!user && dataLoading)) {
    return (
      <div className="admin-shell">
        <div className="admin-loading">
          <div className="admin-spinner" />
          <p>Loading Admin Command Center…</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') return null

  return (
    <div className="admin-shell">
      <div className="admin-ambient" aria-hidden="true">
        <div className="admin-blob admin-blob--1" />
        <div className="admin-blob admin-blob--2" />
        <div className="admin-blob admin-blob--3" />
        <div className="admin-grid-overlay" />
      </div>

      <Navbar />

      <main className="admin-container">
        {/* ── Hero Banner ── */}
        <motion.section
          className="admin-hero admin-glass"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="admin-hero__left">
            <div className="admin-hero__avatar">
              {user.username?.charAt(0).toUpperCase() || 'V'}
            </div>
            <div>
              <div className="admin-hero__eyebrow">
                <ShieldCheck size={13} aria-hidden="true" />
                Super Admin Active · Unlimited Pro Unlocked
              </div>
              <h1 className="admin-hero__title">
                Welcome back, <span className="highlight">{user.username}</span>
              </h1>
              <p className="admin-hero__sub">
                Full administrative control over users, AI interview reports, and unlimited premium tools.
              </p>
            </div>
          </div>

          <div className="admin-hero__actions">
            <button
              type="button"
              className="admin-action-btn admin-action-btn--glass"
              onClick={loadAdminData}
              disabled={dataLoading}
            >
              <RefreshCw size={15} aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              className="admin-action-btn admin-action-btn--primary"
              onClick={() => navigate('/dashboard')}
            >
              <Sparkles size={15} aria-hidden="true" />
              Launch AI Analyzer
              <ArrowRight size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="admin-action-btn admin-action-btn--glass"
              onClick={() => {
                handleLogout()
                navigate('/admin/login')
              }}
            >
              <LogOut size={15} aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </motion.section>

        {/* ── Admin Unlocked Privileges Strip ── */}
        <section className="admin-privileges" aria-label="Admin unlocked privileges">
          <div className="admin-priv-pill admin-glass">
            <div className="admin-priv-pill__icon"><Zap size={18} aria-hidden="true" /></div>
            <div>
              <div className="admin-priv-pill__label">Unlimited AI Analyses</div>
              <div className="admin-priv-pill__status"><CheckCircle2 size={12} /> No 24h Limit · Active</div>
            </div>
          </div>
          <div className="admin-priv-pill admin-glass">
            <div className="admin-priv-pill__icon"><MessageSquare size={18} aria-hidden="true" /></div>
            <div>
              <div className="admin-priv-pill__label">Behavioral Questions</div>
              <div className="admin-priv-pill__status"><CheckCircle2 size={12} /> Unlocked Free</div>
            </div>
          </div>
          <div className="admin-priv-pill admin-glass">
            <div className="admin-priv-pill__icon"><Map size={18} aria-hidden="true" /></div>
            <div>
              <div className="admin-priv-pill__label">7-Day Plan &amp; Roadmap</div>
              <div className="admin-priv-pill__status"><CheckCircle2 size={12} /> Unlocked Free</div>
            </div>
          </div>
          <div className="admin-priv-pill admin-glass">
            <div className="admin-priv-pill__icon"><Crown size={18} aria-hidden="true" /></div>
            <div>
              <div className="admin-priv-pill__label">All Pro Features</div>
              <div className="admin-priv-pill__status"><CheckCircle2 size={12} /> Full Access · No Payment</div>
            </div>
          </div>
        </section>

        {/* ── KPI Stats Grid ── */}
        <section className="admin-stats-grid" aria-label="Platform statistics">
          <div className="admin-stat-card admin-glass">
            <div className="admin-stat-card__top">
              <span className="admin-stat-card__label">Total Users</span>
              <div className="admin-stat-card__icon"><Users size={18} aria-hidden="true" /></div>
            </div>
            <div className="admin-stat-card__value">{stats?.totalUsers ?? '—'}</div>
            <div className="admin-stat-card__foot">
              {stats ? `${stats.proUsers} Pro · ${stats.starterUsers} Starter` : 'Loading…'}
            </div>
          </div>

          <div className="admin-stat-card admin-glass">
            <div className="admin-stat-card__top">
              <span className="admin-stat-card__label">Generated Reports</span>
              <div className="admin-stat-card__icon"><FileText size={18} aria-hidden="true" /></div>
            </div>
            <div className="admin-stat-card__value">{stats?.totalReports ?? '—'}</div>
            <div className="admin-stat-card__foot">Full AI technical &amp; roadmap blueprints</div>
          </div>

          <div className="admin-stat-card admin-glass">
            <div className="admin-stat-card__top">
              <span className="admin-stat-card__label">Avg Match Score</span>
              <div className="admin-stat-card__icon"><Award size={18} aria-hidden="true" /></div>
            </div>
            <div className="admin-stat-card__value">
              {stats ? `${stats.avgMatchScore}%` : '—'}
            </div>
            <div className="admin-stat-card__foot">Across all candidate evaluations</div>
          </div>

          <div className="admin-stat-card admin-glass">
            <div className="admin-stat-card__top">
              <span className="admin-stat-card__label">24h AI Analyses</span>
              <div className="admin-stat-card__icon"><Activity size={18} aria-hidden="true" /></div>
            </div>
            <div className="admin-stat-card__value">{stats?.analyses24h?.total ?? '—'}</div>
            <div className="admin-stat-card__foot">
              {stats
                ? `${stats.analyses24h.completed} completed · ${stats.analyses24h.failed} failed`
                : 'Loading…'}
            </div>
          </div>
        </section>

        {/* ── Workspace Tabs & Table ── */}
        <section className="admin-workspace admin-glass" aria-label="Admin management workspace">
          <div className="admin-toolbar">
            <div className="admin-tabs" role="tablist" aria-label="Admin sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'users'}
                className={`admin-tab ${activeTab === 'users' ? 'admin-tab--active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <Users size={15} aria-hidden="true" />
                Users ({users.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'reports'}
                className={`admin-tab ${activeTab === 'reports' ? 'admin-tab--active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <FileText size={15} aria-hidden="true" />
                Reports ({reports.length})
              </button>
            </div>

            <search>
              <form
                className="admin-search-form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Filter admin records"
              >
                <div className="admin-search-box">
                  <Search size={15} aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      activeTab === 'users'
                        ? 'Search username or email…'
                        : 'Search title, company, or user…'
                    }
                    aria-label="Search records"
                  />
                </div>
                {activeTab === 'users' && (
                  <select
                    className="admin-filter-select"
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    aria-label="Filter users by tier"
                  >
                    <option value="all">All Tiers</option>
                    <option value="admin">Admins</option>
                    <option value="pro">Pro Users</option>
                    <option value="starter">Starter Users</option>
                  </select>
                )}
              </form>
            </search>
          </div>

          {dataLoading ? (
            <div className="admin-loading" style={{ minHeight: '260px' }}>
              <div className="admin-spinner" />
              <p>Fetching records…</p>
            </div>
          ) : activeTab === 'users' ? (
            filteredUsers.length > 0 ? (
              <div
                tabIndex={0}
                role="region"
                aria-labelledby="admin-users-caption"
                className="admin-table-wrap"
              >
                <table className="admin-table">
                  <caption id="admin-users-caption" style={{ display: 'none' }}>
                    ResuNova User Accounts
                  </caption>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Plan Tier</th>
                      <th>Reports</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const isSelf = u._id === user.id
                      const isTargetAdmin = u.role === 'admin'
                      return (
                        <tr key={u._id}>
                          <th>
                            <div className="admin-user-cell">
                              <div className="admin-user-cell__avatar">
                                {u.username?.charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div>
                                <span className="admin-user-cell__name">{u.username}</span>
                                <span className="admin-user-cell__email">{u.email}</span>
                              </div>
                            </div>
                          </th>
                          <td data-label="Role">
                            <span className={`admin-chip ${isTargetAdmin ? 'admin-chip--admin' : 'admin-chip--starter'}`}>
                              {isTargetAdmin ? <><ShieldCheck size={12} /> Admin</> : 'User'}
                            </span>
                          </td>
                          <td data-label="Plan Tier">
                            <span className={`admin-chip ${u.plan === 'pro' ? 'admin-chip--pro' : 'admin-chip--starter'}`}>
                              {u.plan === 'pro' ? <><Crown size={12} /> Pro Active</> : 'Starter'}
                            </span>
                          </td>
                          <td data-label="Reports">{u.reportCount ?? 0}</td>
                          <td data-label="Joined">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                          </td>
                          <td data-label="Actions">
                            <div className="admin-row-actions">
                              <button
                                type="button"
                                className="admin-mini-btn"
                                disabled={busyId === u._id || isTargetAdmin}
                                onClick={() => handleTogglePro(u)}
                                title={isTargetAdmin ? 'Admins always have full Pro access' : 'Toggle Pro plan'}
                              >
                                <Crown size={12} aria-hidden="true" />
                                {u.plan === 'pro' ? 'Set Starter' : 'Grant Pro'}
                              </button>
                              <button
                                type="button"
                                className="admin-mini-btn admin-mini-btn--danger"
                                disabled={busyId === u._id || isSelf}
                                onClick={() => handleDeleteUser(u)}
                                title={isSelf ? 'Cannot delete your active admin account' : 'Delete user'}
                              >
                                <Trash2 size={12} aria-hidden="true" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty">No matching users found.</div>
            )
          ) : filteredReports.length > 0 ? (
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="admin-reports-caption"
              className="admin-table-wrap"
            >
              <table className="admin-table">
                <caption id="admin-reports-caption" style={{ display: 'none' }}>
                  Generated Interview Reports
                </caption>
                <thead>
                  <tr>
                    <th>Report Title</th>
                    <th>Owner</th>
                    <th>Match</th>
                    <th>Sections Unlocked</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((r) => {
                    const scoreClass =
                      r.matchScore >= 80
                        ? 'admin-chip--score-high'
                        : r.matchScore >= 60
                        ? 'admin-chip--score-mid'
                        : 'admin-chip--score-low'
                    return (
                      <tr key={r._id}>
                        <th>
                          <div>
                            <span className="admin-user-cell__name">{r.title || 'Untitled Report'}</span>
                            <span className="admin-user-cell__email">{r.companyName}</span>
                          </div>
                        </th>
                        <td data-label="Owner">{r.user?.username || 'Unknown'}</td>
                        <td data-label="Match">
                          <span className={`admin-chip ${scoreClass}`}>{r.matchScore ?? 0}%</span>
                        </td>
                        <td data-label="Sections">
                          {r.technicalCount} Tech · {r.behavioralCount} Behav · {r.roadmapDays}d Plan
                        </td>
                        <td data-label="Created">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}
                        </td>
                        <td data-label="Actions">
                          <div className="admin-row-actions">
                            <button
                              type="button"
                              className="admin-mini-btn"
                              onClick={() => navigate(`/interview/${r._id}`)}
                            >
                              <ExternalLink size={12} aria-hidden="true" />
                              Inspect
                            </button>
                            <button
                              type="button"
                              className="admin-mini-btn admin-mini-btn--danger"
                              disabled={busyId === r._id}
                              onClick={() => handleDeleteReport(r._id)}
                            >
                              <Trash2 size={12} aria-hidden="true" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-empty">No interview reports found.</div>
          )}
        </section>
      </main>
    </div>
  )
}

export default AdminPanel
