import icon from '../../img/icons.svg';
import fracty from 'fracty';
import View from '../views/view';
class RenderView extends View {
  parentEl = document.querySelector('.recipe');
  message = '';
  errorMessage =
    'the recipe was not found please try again with a different one';
  addHandlerServings(handler) {
    this.parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      handler(+btn.dataset.servings);
    });
  }
  addHandlerBookmark(handler) {
    this.parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  generateTemplate() {
    return ` <figure class="recipe__fig">
          <img src="${this.data.data.recipe.image_url}" alt="${
      this.data.data.recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.data.recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.data.data.recipe.cooking_time
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.data.data.recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-servings="${
                this.data.data.recipe.servings - 1
              }">
                <svg>
                  <use href="${icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-servings="${
                this.data.data.recipe.servings + 1
              }">
                <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${
            this.data.data.recipe.key ? '' : 'hidden'
          }">
           <svg> <use href="${icon}#icon-user"> </use></svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icon}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
           ${this.#generateIngredients()}
 
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.data.data.recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.data.data.recipe.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  #generateIngredients() {
    return this.data.data.recipe.ingredients
      .map(ing => {
        return `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icon}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${
                      ing.quantity ? fracty(ing.quantity) : ''
                    }</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}   </div>
                    </li>`;
      })
      .join(' ');
  }
  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach(eventType => {
      window.addEventListener(eventType, handler);
    });
  }
}

export default new RenderView();
