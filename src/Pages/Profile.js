import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function Profile() {
  const cleanStorage = () => {
    localStorage.clear();
  };

  const userEmail = JSON.parse(localStorage.getItem('user')) || {};
  return (
    <>
      <Header pageName="Profile" search={ false } />
      <p data-testid="profile-email">
        Email:
        { userEmail.email }
      </p>
      <Link to="/done-recipes">
        <button
          type="button"
          name="done"
          data-testid="profile-done-btn"
        >
          Done Recipes

        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes

        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ cleanStorage }
        >
          Logout

        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Profile;
