import icon from '../../img/icons.svg';
import View from '../views/view';
class PaginationView extends View {
  parentEl = document.querySelector('.pagination');

  generateTemplate() {
    if (this.data.currentPage === 1 && this.data.CurrentNumberOfpages > 1) {
      return `  <button class="btn--inline pagination__btn--next" data-goto="2">
            <span>Page 2</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (
      this.data.CurrentNumberOfpages === this.data.currentPage &&
      this.data.CurrentNumberOfpages !== 1
    ) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        this.data.currentPage - 1
      }">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.currentPage - 1}</span>
          </button>
          `;
    }
    if (this.data.currentPage < this.data.CurrentNumberOfpages) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        this.data.currentPage - 1
      }">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.data.currentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next " data-goto=${
            this.data.currentPage + 1
          }>
            <span>Page ${this.data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    return '';
  }
  addHandlerPagination(handler) {
    this.parentEl.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
