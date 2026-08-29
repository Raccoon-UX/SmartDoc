import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/Home/HomePage';
import { DocumentsPage } from '../pages/Documents/DocumentsPage';
import { DocumentDetailPage } from '../pages/Documents/DocumentDetailPage';
import { ServiceDetailPage } from '../pages/Services/ServiceDetailPage';
import { HowItWorksPage } from '../pages/HowItWorks/HowItWorksPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/Auth/ForgotPasswordPage';
import { DashboardOverviewPage } from '../pages/Dashboard/DashboardOverviewPage';
import { DashboardDocumentsPage } from '../pages/Dashboard/DashboardDocumentsPage';
import { DashboardProfilePage } from '../pages/Dashboard/DashboardProfilePage';
import { DashboardSettingsPage } from '../pages/Dashboard/DashboardSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />

        {/* Auth Placeholder Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Dashboard Routes (Phase 1 Preview) */}
        <Route path="/dashboard" element={<DashboardOverviewPage />} />
        <Route path="/dashboard/documents" element={<DashboardDocumentsPage />} />
        <Route path="/dashboard/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
        <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
