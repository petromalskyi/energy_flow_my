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

// let backdropIdEl = '';
const backdropIdEl = document.querySelector('.js-backdrop-id');
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
      ////////////// Кількість сторінок
      let amountPage = data.totalPages;
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

      const secondSearchButtonEl = document.querySelector(
        '.js-exercises-second-search-button',
      );
      console.log(secondSearchButtonEl);
      //js-exercises-second-search-button
      //input name="search"

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
      createMarkupIdModal(data);

      //// const buttonOpenModalIdEl = document.querySelector('.js-second-btn');
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

      buttonAddFavoritesEl.addEventListener('click', () => {
        const settings = {
          name: data.name,
          bodyPart: data.bodyPart,
          calories: data.burnedCalories,
          target: data.target,
        };
        if (arrKeysStorage.some(value => value === `id=${idExercise}`)) {
          alert('This exercise already is in a favourite');
        } else {
          localStorage.setItem(`id=${idExercise}`, JSON.stringify(settings));
          alert('Exercise is successfully added to the favourite');
        }
        // buttonAddFavoritesEl.disabled = 'false';
      });
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

function createMarkupIdModal(data) {
  let markup = `
        <div class="id-modal-position container">
        <button type="button" class="js-id-modal-btn-close">
          <svg  width="24" height="24">
            <use  href="./src/img/symbol-defs.svg#icon-x-black"></use>
          </svg>
        </button>
        <img class="id-modal-img" src="${data.gifUrl}" alt="side hip abduction" />
        <h2 class="id-modal-title">${data.name}</h2>
        <div class="id-modal-line"></div>
        <ul class="id-modal-list-rating">
          <li class="rating-item">${data.rating}</li>
          <li>
            <svg width="18" height="18">
              <use
                class="js-rating-icon"
                href="./src/img/symbol-defs.svg#icon-star"
              ></use>
            </svg>
          </li>
          <li>
            <svg width="18" height="18">
              <use
                class="js-rating-icon"
                href="./src/img/symbol-defs.svg#icon-star"
              ></use>
            </svg>
          </li>
          <li>
            <svg width="18" height="18">
              <use
                class="js-rating-icon"
                href="./src/img/symbol-defs.svg#icon-star"
              ></use>
            </svg>
          </li>
          <li>
            <svg width="18" height="18">
              <use
                class="js-rating-icon"
                href="./src/img/symbol-defs.svg#icon-star"
              ></use>
            </svg>
          </li>
          <li>
            <svg width="18" height="18">
              <use
                class="js-rating-icon"
                href="./src/img/symbol-defs.svg#icon-star"
              ></use>
            </svg>
          </li>
        </ul>
        <ul class="id-modal-list">
          <li>
            <p class="id-modal-text">Target</p>
            <p class="id-modal-value" data-action="target">${data.target}</p>
          </li>
          <li>
            <p class="id-modal-text">Body Part</p>
            <p class="id-modal-value" data-action="waist">${data.bodyPart}</p>
          </li>
          <li>
            <p class="id-modal-text">Equipment</p>
            <p class="id-modal-value" data-action="equipment">${data.equipment}</p>
          </li>
          <li>
            <p class="id-modal-text">Popular</p>
            <p class="id-modal-value" data-action="popular">${data.popularity}</p>
          </li>
          <li>
            <p class="id-modal-text">Burned Calories</p>
            <p class="id-modal-value margin" data-action="burnedcalories">
             ${data.burnedCalories} / ${data.time}
            </p>
          </li>
        </ul>
        <div class="id-modal-line"></div>
        <p class="id-modal-text" data-action="description">${data.description}</p>
        <button type="button" class="id-button-add-favorites">
          Add to favorites
        </button>
      </div>
  `;
  // <button type="button" class="id-button-giv-rating">
  //   Give a rating
  // </button>
  backdropIdEl.innerHTML = markup;

  const countYellowStar = Math.floor(data.rating);
  const starsEl = Array.from(document.querySelectorAll('.js-rating-icon'));

  for (let i = countYellowStar; i < starsEl.length; i++) {
    starsEl[i].classList.replace('js-rating-icon', 'js-rating-icon-passive');
  }
}

function createMarkupExercises(array) {
  let markup = '';
  //     <a class="exercises-link"  href=""></a>
  if (array.length > 0) {
    markup = array.reduce(
      (html, { name, filter, imgUrl }) =>
        html +
        `
      <li>
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

  // const buttonOpenModalIdEl = document.querySelector('.js-second-btn');
}

function createMarkupExercisesSecond(array) {
  let markup = '';

  if (array.length > 0) {
    markup = `
       <div class="exercises-second-div">
        <input
          class="exercises-second-search"
          type="text"
          name="search"
          placeholder="Search"
        />
        <button class="js-exercises-second-search-button" type="button">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7498 15.75L12.4873 12.4875" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>
      </div>`;

    listEl.insertAdjacentHTML('beforebegin', markup);

    //   //  <svg class="exercises-second-icon" width="18" height="18">
    //   //    <use href="../img/symbol-defs.svg#icon-search"></use>
    //   //  </svg>;

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
 <svg class="second-arrow-icon" data-id=${_id} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5625 12.25L12.25 6.5625M12.25 6.5625L6.5625 0.875M12.25 6.5625H0.875" stroke="#1B1B1B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>           
          </button>
        </div>
        <div class="second-position-two">
  <svg class="second-icon-man" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <circle cx="12" cy="12" r="12" fill="#7E847F"/>
 <path d="M18.8234 8.72537C18.6138 8.47498 18.2403 8.44206 17.9899 8.65086L16.349 10.0293L15.5943 8.15961C15.5675 8.08943 15.5267 8.03051 15.4799 7.97853C15.3257 7.63543 15.058 7.34085 14.6889 7.17017C14.5286 7.09739 14.3631 7.0584 14.1977 7.03934C14.1613 7.02028 14.1283 6.99515 14.0868 6.98216L11.199 6.17726C11.037 6.13307 10.8741 6.16167 10.7407 6.23964C10.5821 6.29336 10.4461 6.40859 10.3811 6.57581L9.29378 9.37172C9.17594 9.67583 9.3267 10.0189 9.63168 10.1385C9.93492 10.2563 10.2789 10.1047 10.3976 9.79972L11.316 7.43876L12.6312 7.80438C12.5991 7.85636 12.5645 7.90488 12.5385 7.96033L10.8524 11.6149C10.8282 11.6686 10.8152 11.7232 10.7979 11.7786L8.7488 15.2139L5.31955 16.361C4.9314 16.6513 4.84909 17.198 5.13587 17.5862C5.42439 17.9752 5.97282 18.0575 6.36011 17.7707L9.86907 16.5621C9.97651 16.4841 10.0545 16.3818 10.1134 16.2718C10.1576 16.225 10.2078 16.1878 10.2416 16.1297L11.4633 14.0815L13.6319 15.9296L11.3116 18.5444C10.9919 18.9048 11.024 19.4602 11.3862 19.779C11.7474 20.1005 12.3011 20.0667 12.6225 19.7045L15.5181 16.4425C15.6082 16.342 15.6619 16.2259 15.6983 16.1046C15.7199 16.0387 15.7199 15.9703 15.7251 15.9019C15.7251 15.8672 15.7381 15.836 15.7355 15.8039C15.7277 15.5648 15.6307 15.3326 15.4349 15.1671L13.4395 13.4655C13.5834 13.3286 13.7055 13.1657 13.7939 12.9743L15.0866 10.1749L15.5007 11.2778C15.5181 11.3757 15.551 11.4719 15.6203 11.5525C15.6827 11.627 15.7624 11.6764 15.8473 11.711C15.856 11.7154 15.8664 11.7162 15.8768 11.7188C15.9305 11.7379 15.9851 11.7561 16.0414 11.7587C16.1081 11.7647 16.1757 11.7561 16.2441 11.737C16.2459 11.7362 16.2467 11.7362 16.2467 11.7362C16.2649 11.7318 16.2831 11.7353 16.3013 11.7275C16.3975 11.6911 16.4711 11.6296 16.5344 11.5577L18.8893 9.55886C19.1397 9.34832 19.034 8.97577 18.8234 8.72537Z" fill="#F6F6F6"/>
 <path d="M15.8448 7.30102C16.7564 7.30102 17.4954 6.56206 17.4954 5.65051C17.4954 4.73896 16.7564 4 15.8448 4C14.9333 4 14.1943 4.73896 14.1943 5.65051C14.1943 6.56206 14.9333 7.30102 15.8448 7.30102Z" fill="#F6F6F6"/>
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
