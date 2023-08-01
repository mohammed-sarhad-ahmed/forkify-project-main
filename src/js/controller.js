import * as model from './model';
import 'regenerator-runtime';
import renderView from './views/renderView';
import { async } from 'regenerator-runtime';
import View from './views/view';
import searchView from './views/searchView';
import resultView from './views/resultView';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from '././config';

async function controlRecipeFlow() {
  try {
    const id = location.hash.slice(1);
    if (!id) return;
    renderView.renderSpinner();
    await model.getRecipeFromApi(id);

    renderView.render(model.state.recipe);
    resultView.update(model.getResultForPage());
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    renderView.renderError();
  }
}
async function searchControl(query) {
  try {
    resultView.renderSpinner();
    await model.getSearch(query);
    resultView.render(model.getResultForPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}
function controlPagination(page) {
  resultView.render(model.getResultForPage(page));
  paginationView.render(model.state.search);
}

function controlServing(servings) {
  model.updateServing(servings);
  renderView.update(model.state.recipe);
}

function controlBookmark() {
  if (!model.state.recipe.bookmarked) model.bookmarkRecipe(model.state.recipe);
  else model.removeBookmark(model.state.recipe.data.recipe.id);
  renderView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
}
function ControlBookmarkRender() {
  bookmarkView.render(model.state.bookmarks);
}
async function contorlUpload(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    model.bookmarkRecipe(model.state.recipe);
    bookmarkView.render(model.state.bookmarks);
    renderView.render(model.state.recipe);
    addRecipeView.renderMessage();
    window.history.pushState(null, '', `#${model.state.recipe.data.recipe.id}`);
    setTimeout(
      addRecipeView.toggle.bind(addRecipeView),
      MODAL_CLOSE_SEC * 1000
    );
  } catch (err) {
    addRecipeView.renderError(err);
  }
}
function init() {
  bookmarkView.addHandlerRenderBookmark(ControlBookmarkRender);
  renderView.addHandlerRender(controlRecipeFlow);
  renderView.addHandlerServings(controlServing);
  searchView.addSearchHandler(searchControl);
  paginationView.addHandlerPagination(controlPagination);
  renderView.addHandlerBookmark(controlBookmark);
  addRecipeView.addHandlerUpload(contorlUpload);
}
init();
