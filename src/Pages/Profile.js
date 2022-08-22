import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  return (
    <>
      <Header pageName="Profile" search={ false } />
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
