import icon from '../../img/icons.svg';
import View from '../views/view';
export default class PreviewView extends View {
  genareteListItems(item) {
    const id = window.location.hash.slice(1);
    return ` <li class="preview">
            <a class="preview__link ${
              id === item.id ? 'preview__link--active' : ''
            } " href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.image}" alt="${item.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
                <div class="preview__user-generated  ${
                  item.key ? '' : 'hidden'
                } ">
           <svg> <use href="${icon}#icon-user"> </use></svg>
          </div>
              </div>
            </a>
          </li>`;
  }
  generateTemplate() {
    return this.data.map(this.genareteListItems).join('');
  }
}
