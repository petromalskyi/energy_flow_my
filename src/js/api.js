import axios from 'axios';
import { createMarkupExercises } from './markup';
import { createMarkupExercisesSecond } from './markup';

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

////////////111111111111111111/////////////////////////////////////////////
async function getFilters(choiceFilter = 'filter=Muscles', currentPage = 1) {
  axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'filters';
  // let params = {
  //   page: currentPage,
  //   limit: 8,
  // };

  listEl.removeEventListener('click', onClickBtnSecond);
  listEl.addEventListener('click', onClickExercises);

  currentPageSecond = 1;
  amountPageSecond = 1;

  query = `${resource}?${choiceFilter}&page=${currentPage}&limit=8`;

  //// response = await axios.get(`${resource}?${choiceFilter}`, { params });
  response = await axios.get(query);

  try {
    let amountPage = response.data.totalPages;

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
    createMarkupExercises(response.data.results);
  } catch (error) {
    alert(error.message);
  }
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
async function getExercises() {
  axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'exercises';
  listEl.removeEventListener('click', onClickExercises);

  query = `${resource}?${filter}=${nameQuery}&page=${currentPageSecond}&limit=8`;

  response = await axios.get(query);

  try {
    amountPageSecond = response.data.totalPages;
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

    createMarkupExercisesSecond(response.data.results);

    listEl.addEventListener('click', onClickBtnSecond);
  } catch (error) {
    alert(error.message);
  }
}

function onClickBtnSecond(event) {
  const idExercise = event.target.dataset.id;
  if (!idExercise) {
    return;
  }

  getExercisesID(idExercise);
}

///////////333333333333333333////////////////////////
async function getExercisesID(idExercise) {
  axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';

  let resource = 'exercises';
  query = `${resource}/${idExercise}`;
  response = await axios.get(query);

  try {
    const modalImgEl = document.querySelector('.id-modal-img');
    modalImgEl.setAttribute('src', `${response.data.gifUrl}`);
    const modalTitleEl = document.querySelector('.id-modal-title');
    modalTitleEl.textContent = `${response.data.name}`;
    const modalRatingEl = document.querySelector('.rating-item');
    modalRatingEl.textContent = `${response.data.rating}`;
    const modalTargetEl = document.querySelector('[data-action="target"]');
    modalTargetEl.textContent = `${response.data.target}`;
    const modalWaistEl = document.querySelector('[data-action="waist"]');
    modalWaistEl.textContent = `${response.data.bodyPart}`;
    const modalEquipmentEl = document.querySelector(
      '[data-action="equipment"]',
    );
    modalEquipmentEl.textContent = `${response.data.equipment}`;
    const modalPopularEl = document.querySelector('[data-action="popular"]');
    modalPopularEl.textContent = `${response.data.popularity}`;
    const modalCaloriesEl = document.querySelector(
      '[data-action="burnedcalories"]',
    );
    modalCaloriesEl.textContent = `${response.data.burnedCalories} / ${response.data.time}`;
    const modalDescriptionEl = document.querySelector(
      '[data-action="description"]',
    );
    modalDescriptionEl.textContent = `${response.data.description}`;

    const countYellowStar = Math.floor(response.data.rating);
    const starsEl = document.querySelectorAll('.rating-icon');
    for (let i = countYellowStar; i < starsEl.length; i++) {
      const el = starsEl[i];
      starsEl[i].setAttribute('href', '/img/symbol-defs.svg#icon-star-passive');
    }
    const buttonOpenModalIdEl = document.querySelector('.js-second-btn');
    backdropIdEl = document.querySelector('.js-backdrop-id');
    buttonCloseModalIdEl = document.querySelector('.js-id-modal-btn-close');

    backdropIdEl.classList.toggle('is-hidden');

    // buttonCloseModalIdEl.addEventListener('click', () =>
    //   backdropIdEl.classList.toggle('is-hidden'),
    // );

    buttonCloseModalIdEl.addEventListener('click', onModalIdCLose);
    //   backdropIdEl.classList.toggle('is-hidden'),
    // );

    ////////////////////////
    const buttonAddFavoritesEl = document.querySelector(
      '.id-button-add-favorites',
    );

    const arrKeysStorage = [];
    for (let i = 0; i < localStorage.length; i++) {
      arrKeysStorage.push(localStorage.key(i));
    }

    buttonAddFavoritesEl.addEventListener('click', () => {
      const settings = {
        name: response.data.name,
        bodyPart: response.data.bodyPart,
        calories: response.data.burnedCalories,
        target: response.data.target,
      };

      if (arrKeysStorage.includes(idExercise)) {
        alert('This exercise already is in a favourite');
      } else {
        localStorage.setItem(idExercise, JSON.stringify(settings));
        alert('Exercise is successfully added to the favourite');
      }
    });
  } catch (error) {
    alert(error.message);
  }
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
