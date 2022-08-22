import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <p>
          <input type="radio" data-testid="ingredient-search-radio" />
          ingredient
          <input type="radio" data-testid="name-search-radio" />
          name
          <input type="radio" data-testid="first-letter-search-radio" />
          first-letter
        </p>
        <p>
          <input type="button" data-testid="exec-search-btn" value="Search" />
        </p>
      </form>
    </div>
  );
}

export default SearchBar;
