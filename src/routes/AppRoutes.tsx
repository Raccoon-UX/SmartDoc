import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/Home/HomePage';
import { DocumentsPage } from '../pages/Documents/DocumentsPage';
import { DocumentDetailPage } from '../pages/Documents/DocumentDetailPage';
import { ServiceDetailPage } from '../pages/Services/ServiceDetailPage';
import { HowItWorksPage } from '../pages/HowItWorks/HowItWorksPage';
import { LoaderPage } from '../pages/Loader/LoaderPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/Auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/Auth/ResetPasswordPage';
import { DashboardOverviewPage } from '../pages/Dashboard/DashboardOverviewPage';
import { DashboardDocumentsPage } from '../pages/Dashboard/DashboardDocumentsPage';
import { DashboardProfilePage } from '../pages/Dashboard/DashboardProfilePage';
import { DashboardSettingsPage } from '../pages/Dashboard/DashboardSettingsPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Discovery Routes (100% accessible without login) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentDetailPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/loader" element={<LoaderPage />} />
        <Route path="/loading" element={<LoaderPage />} />

        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Dashboard & Vault Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardOverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/documents"
          element={
            <ProtectedRoute>
              <DashboardDocumentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
