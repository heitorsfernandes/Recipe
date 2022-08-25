import React from 'react';
import shareIcon from '../images/shareIcon.svg';
// implementar a lógica de mostrar a receita feita
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
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes'))
    : [];

  return (
    <div>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            className="img"
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.name }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate }
          </p>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="icone de compartilhar"
          />
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

    </div>
  );
}

export default CardDoneRecipes;