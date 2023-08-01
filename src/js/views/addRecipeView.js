import icon from '../../img/icons.svg';
import View from '../views/view';
class AddRecipeView extends View {
  parentEl = document.querySelector('.upload');
  message = 'the recipe upload was successful';
  window = document.querySelector('.add-recipe-window');
  overLay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this.#addHandlerOpenUpload();
    this.#addHandlerCloseUpload();
  }
  toggle() {
    console.log(this);
    this.window.classList.toggle('hidden');
    this.overLay.classList.toggle('hidden');
  }
  #addHandlerOpenUpload() {
    this.#btnOpen.addEventListener('click', this.toggle.bind(this));
  }
  #addHandlerCloseUpload() {
    this.#btnClose.addEventListener('click', this.toggle.bind(this));
    this.overLay.addEventListener('click', this.toggle.bind(this));
  }
  addHandlerUpload(handler) {
    this.parentEl.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this.parentEl)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
