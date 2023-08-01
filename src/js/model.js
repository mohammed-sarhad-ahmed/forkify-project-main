import { async, keys } from 'regenerator-runtime';
import { AjaxCall } from './helpers';
import { API_URL, RESULT_PER_PAGE, KEY } from './config';
export const state = {
  recipe: '',
  search: {
    query: '',
    result: [],
    currentPage: 1,
    resultPerPage: RESULT_PER_PAGE,
    CurrentNumberOfpages: '',
  },
  bookmarks: [],
};
export async function getRecipeFromApi(id) {
  try {
    const data = await AjaxCall(`${API_URL}${id}?key=${KEY}`);
    state.recipe = data;
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
}
export async function getSearch(query) {
  try {
    state.search.query = query;
    const data = await AjaxCall(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.result = data.data.recipes.map(item => {
      return {
        title: item.title,
        publisher: item.publisher,
        image: item.image_url,
        id: item.id,
        ...(item.key && { key: item.key }),
      };
    });
    state.search.currentPage = 1;
  } catch (err) {
    throw err;
  }
}
export function getResultForPage(page = state.search.currentPage) {
  state.search.currentPage = page;
  state.search.CurrentNumberOfpages = Math.ceil(
    state.search.result.length / state.search.resultPerPage
  );
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
}
export function updateServing(servings) {
  if (servings === 0) return;
  state.recipe.data.recipe.ingredients.forEach(el => {
    if (el.quantity)
      el.quantity =
        (el.quantity * servings) / state.recipe.data.recipe.servings;
  });
  state.recipe.data.recipe.servings = servings;
}
function persistBookmarks() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function bookmarkRecipe(recipe) {
  recipe = {
    title: recipe.data.recipe.title,
    publisher: recipe.data.recipe.publisher,
    image: recipe.data.recipe.image_url,
    id: recipe.data.recipe.id,
    ...(recipe.data.recipe.key && { key: recipe.data.recipe.key }),
  };

  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  persistBookmarks();
}
export function removeBookmark(id) {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
}

function Init() {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (storage) state.bookmarks = storage;
}
Init();
function clearBookmarks() {
  localStorage.clear('bookmarks');
}

export async function uploadRecipe(newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entries => {
        return entries[0].startsWith('ingredient') && entries[1].trim() !== '';
      })
      .map(entries => {
        const ingArr = entries[1].split(',').map(item => item.trim());
        const [quantity, unit, description] = ingArr;
        if (ingArr.length !== 3) throw new Error('wrong ingredient Format !');
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      image_url: newRecipe.image,
      ingredients: ingredients,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
    };
    const data = await AjaxCall(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = data;
  } catch (err) {
    throw err;
  }
}
