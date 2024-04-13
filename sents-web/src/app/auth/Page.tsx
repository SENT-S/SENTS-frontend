import React, { useState } from 'react';
import Login from './_sections/login/Login';
import Register from './_sections/register/Register';
import Nav from './_sections/nav/Nav';

const Account = () => {
  const [selectedTab, setSelectedTab] = useState('Sign In');

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-10 bg-white shadow-md rounded-xl">
        <Nav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === 'Sign In' ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Account;
