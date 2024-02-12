import icons from '../img/symbol-defs.svg';

import { getQuote } from './home';

const favoriteListEl = document.querySelector('.js-favorite-list');

getQuote();

createMarkupFavorites();

function createMarkupFavorites() {
  const arrKeysStorage = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) !== 'quotation' && localStorage.key(i) !== '') {
      arrKeysStorage.push(localStorage.key(i));
    }
  }
  let markup = '';
  if (arrKeysStorage.length > 0) {
    for (let i = 0; i < arrKeysStorage.length; i++) {
      let storegeData = JSON.parse(localStorage.getItem(arrKeysStorage[i]));
      let name = storegeData.name;
      let calories = storegeData.calories;
      let bodyPart = storegeData.bodyPart;
      let target = storegeData.target;
      markup += `
     <li class="second-item">
          <div class="second-position-one">
            <div class="second-flex">
              <p class="second-workout">WORKOUT</p>
              <div class="second-flex-one">
                <button type="button" class="js-favorite-btn" data-action='delete' data-id=${arrKeysStorage[i]}>
                    <svg width="16" height="16" data-action='delete' data-id=${arrKeysStorage[i]}>
                    <use href="${icons}#icon-trash" data-action='delete' data-id=${arrKeysStorage[i]}></use>
                    </svg>
                </button>
              </div>
            </div>
            <button type="button" class="js-second-btn" data-id=${arrKeysStorage[i]}>
              Start
              <svg class="second-arrow-icon" width="14" height="14" data-id=${arrKeysStorage[i]}>
                <use class="second-arrow-icon" href="${icons}#icon-arrow" data-id=${arrKeysStorage[i]}></use>
              </svg>
            </button>
          </div>
          <div class="second-position-two">
            <svg class="second-icon-man" width="24" height="24">
              <use href="${icons}#icon-running-man"></use>
            </svg>
            <p class="second-title">${name}</p>
          </div>
          <div class="second-position-three">
            <div>
              <p class="second-text">Burned calories:</p>
              <p class="second-entrance">${calories} / 3 min</p>
            </div>
            <div>
              <p class="second-text">Body part:</p>
              <p class="second-entrance">${bodyPart} </p>
            </div>
            <div>
              <p class="second-text">Target:</p>
              <p class="second-entrance">${target}</p>
            </div>
          </div>
        </li>`;
    }
  } else {
    markup = `<li class="exercises-item">
        <p class="message-undefined">
         It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.
        </p>
      </li>`;
  }

  favoriteListEl.innerHTML = markup;
}

favoriteListEl.addEventListener('click', onFavoriteClick);

function onFavoriteClick(event) {
  console.dir(event.target.dataset.id);
  if (!event.target.dataset.id) {
    return;
  }
  console.log(event.target.className);
  if (
    event.target.className === 'js-favorite-btn' ||
    event.target.dataset.action === 'delete'
  ) {
    const user = confirm(
      'Are you sure that want to delete this exercise from a favourite?',
    );
    if (user) {
      localStorage.removeItem(event.target.dataset.id);
      createMarkupFavorites();
    }
  }
}
