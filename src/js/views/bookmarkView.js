import previewView from './previewView';
class BookMark extends previewView {
  parentEl = document.querySelector('.bookmarks__list');
  message = '';
  errorMessage = 'no bookmark yet,add one !';
  addHandlerRenderBookmark(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookMark();
