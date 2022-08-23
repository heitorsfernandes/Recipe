import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header pageName="Profile" search={ false } />
      <p data-testid="profile-email">
        Email:
        { userEmail.email }
      </p>
      <button
        type="button"
        name="done"
        data-testid="profile-done-btn"
      >
        Done Recipes

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </>
  );
}

export default Profile;
