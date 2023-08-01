import icon from '../../img/icons.svg';
import View from '../views/view';
class SearchView extends View {
  parentEl = document.querySelector('.search');

  addSearchHandler(handler) {
    this.parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const query = this.parentEl.querySelector('.search__field').value;
      if (!query) return;
      this.#clearSearch();
      handler(query);
    });
  }

  #clearSearch() {
    this.parentEl.querySelector('input').value = '';
  }
}

export default new SearchView();
