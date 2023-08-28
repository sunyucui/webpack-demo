import React from 'react';
import user from '@/assets/images/user/user.svg';

const WelcomePage: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: '40px', padding: '30px 0' }}>欢迎使用涅槃CRM系统</div>
    {/* <img src={user} style={{ height: '100%' }} /> */}
  </div>
);

export default WelcomePage;
