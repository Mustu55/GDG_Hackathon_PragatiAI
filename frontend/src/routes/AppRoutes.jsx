import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CitizenLayout } from '../components/layout/CitizenLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Public Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import CitizenRegisterPage from '../pages/CitizenRegisterPage';
import OfficerRegisterPage from '../pages/OfficerRegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import AccessDeniedPage from '../pages/AccessDeniedPage';

// Citizen Pages
import CitizenDashboardPage from '../pages/CitizenDashboardPage';
import ReportComplaintPage from '../pages/ReportComplaintPage';
import MyReportsPage from '../pages/MyReportsPage';
import ChatbotPage from '../pages/ChatbotPage';
import ComplaintDetailsPage from '../pages/ComplaintDetailsPage';
import StatusCheckPage from '../pages/StatusCheckPage';

// Admin Pages
import AdminDashboardPage from '../pages/AdminDashboardPage';
import IssuesTabPage from '../pages/IssuesTabPage';
import IssueDetailsPage from '../pages/IssueDetailsPage';
import MapViewPage from '../pages/MapViewPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import GovernanceBriefPage from '../pages/GovernanceBriefPage';
import NotificationsPage from '../pages/NotificationsPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/ProfilePage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register/citizen" element={<CitizenRegisterPage />} />
      <Route path="/register/officer" element={<OfficerRegisterPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      {/* Citizen Protected Routes */}
      <Route element={<CitizenLayout />}>
        <Route path="/dashboard" element={<CitizenDashboardPage />} />
        <Route path="/report" element={<ReportComplaintPage />} />
        <Route path="/my-reports" element={<MyReportsPage />} />
        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/complaint/:id" element={<ComplaintDetailsPage />} />
        <Route path="/status-check" element={<StatusCheckPage />} />
      </Route>

      {/* Admin / Officer Protected Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/issues" element={<IssuesTabPage />} />
        <Route path="/admin/issues/:id" element={<IssueDetailsPage />} />
        <Route path="/admin/map" element={<MapViewPage />} />
        <Route path="/admin/analytics" element={<AnalyticsPage />} />
        <Route path="/admin/brief" element={<GovernanceBriefPage />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
