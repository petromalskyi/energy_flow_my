// /////import axios from 'axios';
// import { createMarkupExercises } from './markup';
// import { createMarkupExercisesSecond } from './markup';
// import icons from '../img/symbol-defs.svg';

///////////////////////home.js
let response = '';
let choiceFilter = 'filter=Muscles';
let currentPage = 1;
let currentPageSecond = 1;
let amountPageSecond = 1;
let nameQuery = '';

let backdropIdEl = '';
let buttonCloseModalIdEl = '';

const btnFiltersEl = document.querySelector('.js-exercises-list-btn');

const btnMusclesEl = document.querySelector(
  'button[data-action="filter=Muscles"]',
);
const btnBodyEl = document.querySelector(
  'button[data-action="filter=Body parts"]',
);
const btnEquipmentEl = document.querySelector(
  'button[data-action="filter=Equipment"]',
);
const exercisesTitleEl = document.querySelector('.js-exercises-title');
const exercisesTextEl = document.querySelector('.js-exercises-text');
const listEl = document.querySelector('.js-exercises-list');

let filter = 'muscles';

btnFiltersEl.addEventListener('click', onChangeFilter);

function onChangeFilter(event) {
  btnMusclesEl.classList.remove('active');
  btnBodyEl.classList.remove('active');
  btnEquipmentEl.classList.remove('active');

  event.target.classList.add('active');

  choiceFilter = event.target.dataset.action;
  filter = event.target.dataset.filter;
  currentPage = 1;
  exercisesTitleEl.textContent = 'Exercises';
  exercisesTextEl.textContent = '';

  getFilters(choiceFilter, currentPage);
}
//////////////////////

const amountPageEl = document.querySelector('.js-exercises-countpage');
const amountPageSecondEl = document.querySelector(
  '.js-exercises-second-countpage',
);

let query = '';

getFilters(choiceFilter, currentPage);

//////////111111111111111111/////////////////////////////////////////////
function getFilters(choiceFilter = 'filter=Muscles', currentPage = 1) {
  // axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'filters';
  // let params = {
  //   page: currentPage,
  //   limit: 8,
  // };

  listEl.addEventListener('click', onClickExercises);
  listEl.removeEventListener('click', onClickBtnSecond);

  currentPageSecond = 1;
  amountPageSecond = 1;

  query = `https://energyflow.b.goit.study/api/${resource}?${choiceFilter}&page=${currentPage}&limit=8`;

  //// response = await axios.get(`${resource}?${choiceFilter}`, { params });
  // response = await axios.get(query);

  fetch(query)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      let amountPage = data.totalPages;

      ////////////// Кількість сторінок
      amountPageEl.innerHTML = '';
      amountPageSecondEl.innerHTML = '';
      if (amountPage > 1) {
        let amountPageMarkup = '';

        for (let i = 1; i <= amountPage; i += 1) {
          if (i === currentPage) {
            amountPageMarkup += `<button data-action=${i} class="js-exercises-countpage-btn active " type="button">${i}</button>`;
          } else {
            amountPageMarkup += `
          <button data-action=${i} class="js-exercises-countpage-btn " type="button">${i}</button>
        `;
          }
          amountPageEl.innerHTML = amountPageMarkup;

          amountPageEl.addEventListener('click', onChangeActivePage);
        }
      }
      createMarkupExercises(data.results);
    })
    .catch(error => {
      alert(error.message);
    });
}

function onClickExercises(event) {
  event.preventDefault();
  nameQuery = event.target.dataset.name;
  exercisesTitleEl.textContent = `Exercises / `;
  let nameQueryFirstUpper = nameQuery[0].toUpperCase() + nameQuery.slice(1);
  exercisesTextEl.textContent = `${nameQueryFirstUpper}`;
  getExercises();
}

///////////////222222222/////////////////////////////////////
function getExercises() {
  // axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'exercises';
  listEl.removeEventListener('click', onClickExercises);

  // query = `${resource}?${filter}=${nameQuery}&page=${currentPageSecond}&limit=8`;

  // response = await axios.get(query);
  //query = `https://energyflow.b.goit.study/api/${resource}?${choiceFilter}&page=${currentPage}&limit=8`;
  query = `https://energyflow.b.goit.study/api/${resource}?${filter}=${nameQuery}&page=${currentPageSecond}&limit=8`;

  fetch(query)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      amountPageSecond = data.totalPages;
      amountPageEl.innerHTML = '';
      amountPageSecondEl.innerHTML = '';
      if (amountPageSecond > 1) {
        let amountPageMarkup = '';

        for (let i = 1; i <= amountPageSecond; i += 1) {
          if (i === currentPageSecond) {
            amountPageMarkup += `<button data-action=${i} class="js-exercises-countpage-btn active " type="button">${i}</button>`;
          } else {
            amountPageMarkup += `
          <button data-action=${i} class="js-exercises-countpage-btn " type="button">${i}</button>
        `;
          }
        }
        amountPageSecondEl.innerHTML = amountPageMarkup;
        amountPageSecondEl.addEventListener('click', onChangeActivePageSecond);
      }

      createMarkupExercisesSecond(data.results);

      listEl.addEventListener('click', onClickBtnSecond);
    })
    .catch(error => {
      alert(error.message);
    });
}

function onClickBtnSecond(event) {
  const idExercise = event.target.dataset.id;
  if (!idExercise) {
    return;
  }

  getExercisesID(idExercise);
}

///////////333333333333333333////////////////////////
function getExercisesID(idExercise) {
  // axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'exercises';
  // query = `${resource}/${idExercise}`;
  //  response = await axios.get(query);
  query = `https://energyflow.b.goit.study/api/${resource}/${idExercise}`;

  fetch(query)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const modalImgEl = document.querySelector('.id-modal-img');
      modalImgEl.setAttribute('src', `${data.gifUrl}`);
      const modalTitleEl = document.querySelector('.id-modal-title');
      modalTitleEl.textContent = `${data.name}`;
      const modalRatingEl = document.querySelector('.rating-item');
      modalRatingEl.textContent = `${data.rating}`;
      const modalTargetEl = document.querySelector('[data-action="target"]');
      modalTargetEl.textContent = `${data.target}`;
      const modalWaistEl = document.querySelector('[data-action="waist"]');
      modalWaistEl.textContent = `${data.bodyPart}`;
      const modalEquipmentEl = document.querySelector(
        '[data-action="equipment"]',
      );
      modalEquipmentEl.textContent = `${data.equipment}`;
      const modalPopularEl = document.querySelector('[data-action="popular"]');
      modalPopularEl.textContent = `${data.popularity}`;
      const modalCaloriesEl = document.querySelector(
        '[data-action="burnedcalories"]',
      );
      modalCaloriesEl.textContent = `${data.burnedCalories} / ${data.time}`;
      const modalDescriptionEl = document.querySelector(
        '[data-action="description"]',
      );
      modalDescriptionEl.textContent = `${data.description}`;

      const countYellowStar = Math.floor(data.rating);
      const starsEl = document.querySelectorAll('.rating-icon');
      for (let i = countYellowStar; i < starsEl.length; i++) {
        const el = starsEl[i];
        starsEl[i].setAttribute(
          'href',
          '../img/symbol-defs.svg#icon-star-passive',
        );
      }
      const buttonOpenModalIdEl = document.querySelector('.js-second-btn');
      backdropIdEl = document.querySelector('.js-backdrop-id');
      buttonCloseModalIdEl = document.querySelector('.js-id-modal-btn-close');

      backdropIdEl.classList.toggle('is-hidden');

      buttonCloseModalIdEl.addEventListener('click', onModalIdCLose);

      ////////////////////////
      const buttonAddFavoritesEl = document.querySelector(
        '.id-button-add-favorites',
      );

      const arrKeysStorage = [];
      for (let i = 0; i < localStorage.length; i++) {
        arrKeysStorage.push(localStorage.key(i));
      }
      console.log(arrKeysStorage);

      buttonAddFavoritesEl.addEventListener(
        'click',
        onSavedFavoriteLocalStorage,
      );

      // onSavedFavoriteLocalStorage();

      function onSavedFavoriteLocalStorage() {
        console.log(idExercise);
        console.log(arrKeysStorage.includes(idExercise));
        const settings = {
          name: data.name,
          bodyPart: data.bodyPart,
          calories: data.burnedCalories,
          target: data.target,
        };

        if (arrKeysStorage.includes(idExercise)) {
          alert('This exercise already is in a favourite');
        } else {
          localStorage.setItem(idExercise, JSON.stringify(settings));
          alert('Exercise is successfully added to the favourite');
        }
        buttonAddFavoritesEl.removeEventListener(
          'click',
          onSavedFavoriteLocalStorage,
        );
      }
    })
    .catch(error => {
      alert(error.message);
    });
}

function onModalIdCLose() {
  backdropIdEl.classList.toggle('is-hidden');
}

function onChangeActivePage(event) {
  for (const el of amountPageEl.children) {
    el.classList.remove('active');
  }

  event.target.classList.add('active');
  currentPage = Number(event.target.dataset.action);
  getFilters(choiceFilter, currentPage);
}

function onChangeActivePageSecond(event) {
  const amountPageSecondEl = document.querySelector(
    '.js-exercises-second-countpage',
  );
  console.log(amountPageSecondEl);

  for (const el of amountPageSecondEl.children) {
    el.classList.remove('active');
  }

  event.target.classList.add('active');
  currentPageSecond = Number(event.target.dataset.action);
  console.log('currentPageSecond', currentPageSecond);
  getExercises();
}

function createMarkupExercises(array) {
  let markup = '';
  //     <a class="exercises-link"  href=""></a>
  if (array.length > 0) {
    markup = array.reduce(
      (html, { name, filter, imgUrl }) =>
        html +
        `
      <li class="exercises-item">
      <a class="exercises-link"  href="">
            <img
            class="exercises-image"
            src="${imgUrl}"
            alt="${name}"
            data-filter='${filter}' 
            data-name='${name}'
            />
            <div class="div-position">
                <p class="exercises-filter" data-filter='${filter}' 
            data-name='${name}'>${filter}</p>
                <p class="exercises-name" data-filter='${filter}' 
            data-name='${name}'>${name}</p>
            </div>
            </a>
       </li>`,
      '',
    );
  } else {
    markup = `<li class="exercises-item">
      <p class="message-undefined">
        Unfortunately, no results were found.You may want to consider other
        search options to find the exercise you are looking for.Our range is
        wide and you have the opportunity to find more options that suit your
        needs.
      </p>
    </li>`;
  }

  listEl.innerHTML = markup;

  const buttonOpenModalIdEl = document.querySelector('.js-second-btn');
}

function createMarkupExercisesSecond(array) {
  let markup = '';
  //   <use href="${icons}#icon-star"></use>
  //<use href="../img/symbol-defs.svg/#icon-star"></use>;
  //  <svg class="second-icon-star" width="18" height="18" viewBox="0 0 18 18">
  //    <path
  //      fill="#eea10c"
  //      style="fill: var(--color1, #eea10c)"
  //      d="M14.89 2.282c0.737-2.268 3.945-2.268 4.682 0l2.080 6.402c0.33 1.014 1.275 1.701 2.341 1.701h6.731c2.384 0 3.376 3.051 1.447 4.453l-5.446 3.957c-0.863 0.627-1.224 1.738-0.894 2.752l2.080 6.402c0.737 2.268-1.859 4.154-3.788 2.752l-5.446-3.957c-0.863-0.627-2.031-0.627-2.894 0l-5.446 3.957c-1.929 1.402-4.525-0.484-3.788-2.752l2.080-6.402c0.33-1.014-0.031-2.125-0.894-2.752l-5.446-3.957c-1.929-1.402-0.938-4.453 1.447-4.453h6.731c1.066 0 2.012-0.687 2.341-1.701l2.080-6.402z"
  //    ></path>
  //  </svg>;
  if (array.length > 0) {
    markup = array.reduce(
      (html, { rating, name, burnedCalories, bodyPart, target, _id }) =>
        html +
        `
        <li class="second-item">
        <div class="second-position-one">
          <div class="second-flex">
            <p class="second-workout">WORKOUT</p>
            <div class="second-flex-one">
              <p class="second-star">${rating}</p>
              <svg width="18" height="18" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.04894 0.927052C6.3483 0.0057416 7.6517 0.00574088 7.95106 0.927052L8.79611 3.52786C8.92999 3.93989 9.31394 4.21885 9.74717 4.21885H12.4818C13.4505 4.21885 13.8533 5.45846 13.0696 6.02786L10.8572 7.63525C10.5067 7.8899 10.3601 8.34127 10.494 8.75329L11.339 11.3541C11.6384 12.2754 10.5839 13.0415 9.80017 12.4721L7.58779 10.8647C7.2373 10.6101 6.7627 10.6101 6.41222 10.8647L4.19983 12.4721C3.41612 13.0415 2.36164 12.2754 2.66099 11.3541L3.50604 8.75329C3.63992 8.34127 3.49326 7.8899 3.14277 7.63525L0.930391 6.02787C0.146677 5.45846 0.549452 4.21885 1.51818 4.21885H4.25283C4.68606 4.21885 5.07001 3.93989 5.20389 3.52786L6.04894 0.927052Z" fill="#EEA10C"/>
</svg>
            </div>
          </div>
          <button type="button" class="js-second-btn" data-id=${_id}>
            Start
            <svg class="second-arrow-icon" width="14" height="14">
              <use
                class="second-arrow-icon"
                href="../img/symbol-defs.svg/#icon-arrow"
              ></use>
            </svg>
          </button>
        </div>
        <div class="second-position-two">
          <svg class="second-icon-man" width="24" height="24">
            <use href="../img/symbol-defs.svg/#icon-running-man"></use>
          </svg>
          <p class="second-title">${name}</p>
        </div>

        <div class="second-position-three">
          <div>
            <p class="second-text">Burned calories:</p>
            <p class="second-entrance">${burnedCalories} / 3 min</p>
          </div>
          <div>
            <p class="second-text">Body part:</p>
            <p class="second-entrance">${bodyPart}</p>
          </div>
          <div>
            <p class="second-text">Target:</p>
            <p class="second-entrance">${target}</p>
          </div>
        </div>
      </li>
   `,
      '',
    );
  } else {
    markup = `<li class="exercises-item">
      <p class="message-undefined">
        Unfortunately, no results were found.You may want to consider other
        search options to find the exercise you are looking for.Our range is
        wide and you have the opportunity to find more options that suit your
        needs.
      </p>
    </li>`;
  }

  listEl.innerHTML = markup;
}
