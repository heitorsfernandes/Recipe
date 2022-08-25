import React from 'react';
import shareIcon from '../images/shareIcon.svg';
// implementar a lógica de mostrar a receita feita
// implementar função de compartilhar

function CardDoneRecipes() {
  // const para testes
  const index = 0;
  const tagName = 'All';
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg"
        alt=""
        className="img"
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        Categoria da receita

      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        nome da receita

      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        data da receita
      </p>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="icone de compartilhar"
      />
      <ul>
        <li
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        />
      </ul>
    </div>
  );
}

export default CardDoneRecipes;
