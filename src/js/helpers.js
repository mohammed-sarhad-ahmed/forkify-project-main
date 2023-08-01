import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config';
function timeout(sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`The request took ${sec} Timeout`);
    }, sec * 1000);
  });
}
export async function AjaxCall(url, recipe) {
  try {
    const fetchPro = recipe
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIME_OUT)]);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
}
