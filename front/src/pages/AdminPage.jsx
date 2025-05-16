import React, { useState } from 'react';
//import { Box } from '@mui/material';
import AdminPanel from '../components/AdminPanel';
import Headerforhome from '../components/Headerforhome';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Headerforhome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ flex: 1 }}>
        <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;