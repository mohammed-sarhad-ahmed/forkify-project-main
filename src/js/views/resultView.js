import PreviewView from './previewView';
class ResultView extends PreviewView {
  parentEl = document.querySelector('.results');
  message = '';
  errorMessage =
    'the query was not found please try again with a different one';
}

export default new ResultView();
