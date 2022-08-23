import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, search }) {
  const history = useHistory();
  const [toggleSearch, setToggleSearch] = useState(false);
  const { setInputSearch } = useContext(Context);

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
        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
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
