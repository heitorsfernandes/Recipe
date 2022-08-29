import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// implementar função de compartilhar
// a chave do doneRecipes vem do localStorage
// a chave doneRecipes deve conter a seguinte estrutura:
// [{
//     id: id-da-receita,
//     type: comida-ou-bebida,
//     nationality: nacionalidade-da-receita-ou-texto-vazio,
//     category: categoria-da-receita-ou-texto-vazio,
//     alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//     name: nome-da-receita,
//     image: imagem-da-receita,
//     doneDate: quando-a-receita-foi-concluida,
//     tags: array-de-tags-da-receita-ou-array-vazio
// }]

function CardDoneRecipes() {
  const [copyUrl, setCopyUrl] = useState();
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];
  const [newDoneRecipes, setNewDoneRecipes] = useState(doneRecipes);

  const handleClick = ({ target: { value } }) => {
    if (value !== 'All') {
      const filterRecipes = doneRecipes.filter((recipe) => recipe.type === value);
      setNewDoneRecipes(filterRecipes);
    } else return setNewDoneRecipes(doneRecipes);
  };

  const getUrl = async (type, id) => {
    const url2 = `http://localhost:3000/${type}s/${id}`;
    const interval = 1000;
    await clipboardCopy(url2).then(setCopyUrl(true));
    setInterval(() => setCopyUrl(false), interval);
    console.log(url2);
  };

  return (
    <section>
      <div>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          type="button"
          name="Food"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          type="button"
          name="Drinks"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleClick }
        >
          Drinks
        </button>
      </div>
      {newDoneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                className="img"
              />
            </Link>
          </div>
          {
            recipe.type === 'food' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.nationality} - ${recipe.category}` }
              </p>
            )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot}
                </p>
              )
          }
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name }
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate }
          </p>
          <button
            type="button"
            src={ shareIcon }
            id={ index }
            onClick={ () => getUrl(recipe.type, recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="icone de compartilhar"
            />
          </button>
          <ul>
            {recipe.tags.slice(0, 2).map((tagName, indexTag) => (
              <li
                key={ indexTag }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
      { copyUrl && <span>Link copied!</span>}
    </section>
  );
}

export default CardDoneRecipes;
