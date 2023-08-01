import { range } from 'underscore';
import icon from '../../img/icons.svg';
export default class View {
  data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', this.generateTemplate());
  }
  update(data) {
    this.data = data;
    const NewmarkUp = this.generateTemplate();
    const NewMarkObj = document
      .createRange()
      .createContextualFragment(NewmarkUp);
    const newElements = Array.from(NewMarkObj.querySelectorAll('*'));
    const curElements = Array.from(this.parentEl.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const curElement = curElements.at(i);
      if (
        !curElement.isEqualNode(newElement) &&
        curElement.firstChild?.nodeValue.trim() !== ''
      ) {
        curElement.textContent = newElement.textContent;
      }
      if (!curElement.isEqualNode(newElement)) {
        const attributes = Array.from(newElement.attributes);
        attributes.forEach(NewAttr => {
          curElement.setAttribute(NewAttr.name, NewAttr.value);
        });
      }
    });
  }
  clear() {
    this.parentEl.innerHTML = '';
  }

  renderError(message = this.errorMessage) {
    this.clear();
    const template = `<div class="error">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
               </svg>
            </div>
            <p>${message}</p>
      </div>`;

    this.parentEl.insertAdjacentHTML('afterbegin', template);
  }
  renderSpinner() {
    this.clear();
    const template = `<div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div> -->`;

    this.parentEl.insertAdjacentHTML('afterbegin', template);
  }

  renderMessage(message = this.message) {
    this.clear();
    const template = `<div class="message">
            <div>
              <svg>
                <use href="${icon}#icon-smile"></use>
               </svg>
            </div>
            <p>${message}</p>
      </div>`;

    this.parentEl.insertAdjacentHTML('afterbegin', template);
  }
}
