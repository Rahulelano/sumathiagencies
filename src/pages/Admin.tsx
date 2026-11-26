import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/Admin/AdminLogin';
import { AdminDashboard } from '../components/Admin/AdminDashboard';
import { isAuthenticated } from '../services/api';
import type { Page } from '../types';

interface AdminProps {
  navigate: (page: Page) => void;
}

export function Admin({ navigate }: AdminProps): React.ReactElement {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (!authed) {
    return (
      <AdminLogin
        onLoginSuccess={() => setAuthed(true)}
        navigate={navigate}
      />
    );
  }

  return (
    <AdminDashboard
      navigate={navigate}
      onLogout={() => setAuthed(false)}
    />
  );
}
