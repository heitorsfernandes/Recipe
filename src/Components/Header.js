import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, search }) {
  const history = useHistory();
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <header>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="src/images/profileIcon.svg"
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } alt="Profile" />
      </button>

      <h1 data-testid="page-title">{pageName}</h1>

      { search && (
        <button
          type="button"
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
          onClick={ () => setToggleSearch(!toggleSearch) }
        >
          <img src={ searchIcon } alt="Profile" />
        </button>)}

      { toggleSearch && (
        <input type="text" data-testid="search-input" />
      )}

    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string,
  search: PropTypes.bool,
}.isRequired;

Header.defaultProps = { search: true };

export default Header;
