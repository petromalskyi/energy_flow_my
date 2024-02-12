import axios from 'axios';

// const buttonAddFavoritesEl = document.querySelector('.id-button-add-favorites');
// console.log(buttonAddFavoritesEl);

// import { getFilters } from './api';

// //import { choiceFilter } from './api';
// // console.log('home', choiceFilter);

// //export let choiceFilter = 'filter=Muscles';

// let choiceFilter = 'filter=Muscles';
// let currentPage = 1;

// const btnFiltersEl = document.querySelector('.js-exercises-list-btn');
// const btnMusclesEl = document.querySelector(
//   'button[data-action="filter=Muscles"]',
// );
// const btnBodyEl = document.querySelector(
//   'button[data-action="filter=Body parts"]',
// );
// const btnEquipmentEl = document.querySelector(
//   'button[data-action="filter=Equipment"]',
// );

// btnFiltersEl.addEventListener('click', onChangeFilter);

// function onChangeFilter(event) {
//   btnMusclesEl.classList.remove('active');
//   btnBodyEl.classList.remove('active');
//   btnEquipmentEl.classList.remove('active');

//   event.target.classList.add('active');

//   choiceFilter = event.target.dataset.action;

//   currentPage = 1;
//   // return choiceFilter, currentPage;
//   getFilters(choiceFilter, currentPage);
// }

const quoteTextEl = document.querySelector('.quote-text');
const quoteAuthorEl = document.querySelector('.quote-author');

export async function getQuote() {
  axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/quote';

  const date = new Date();
  const currentDate =
    date.getFullYear() + String(date.getMonth()) + date.getDate();

  let objLocalStorage = {};
  if (localStorage.getItem('quotation')) {
    objLocalStorage = JSON.parse(localStorage.getItem('quotation'));
  }

  if (
    !localStorage.getItem('quotation') ||
    currentDate !== objLocalStorage.date
  ) {
    const response = await axios.get();
    try {
      quoteTextEl.textContent = response.data.quote;
      quoteAuthorEl.textContent = response.data.author;
      const settings = {
        date: currentDate,
        quote: response.data.quote,
        author: response.data.author,
      };
      localStorage.setItem('quotation', JSON.stringify(settings));
    } catch (error) {
      alert(error.message);
    }
  } else {
    quoteTextEl.textContent = objLocalStorage.quote;
    quoteAuthorEl.textContent = objLocalStorage.author;
  }
}

getQuote();
