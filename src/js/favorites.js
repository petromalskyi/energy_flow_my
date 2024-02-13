// import icons from '../img/symbol-defs.svg';

// import { getQuote } from './home';

const favoriteListEl = document.querySelector('.js-favorite-list');
favoriteListEl.addEventListener('click', onFavoriteClickDelete);

//getQuote();

createMarkupFavorites();
// <use href="${icons}#icon-trash" data-action='delete' data-id=${arrKeysStorage[i]}></use>

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
<svg width="16" height="16" data-action='delete' data-id=${arrKeysStorage[i]} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 4.00001V3.46668C10.6667 2.71994 10.6667 2.34657 10.5213 2.06136C10.3935 1.81047 10.1895 1.6065 9.93865 1.47867C9.65344 1.33334 9.28007 1.33334 8.53333 1.33334H7.46667C6.71993 1.33334 6.34656 1.33334 6.06135 1.47867C5.81046 1.6065 5.60649 1.81047 5.47866 2.06136C5.33333 2.34657 5.33333 2.71994 5.33333 3.46668V4.00001M6.66667 7.66668V11M9.33333 7.66668V11M2 4.00001H14M12.6667 4.00001V11.4667C12.6667 12.5868 12.6667 13.1468 12.4487 13.5747C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6667 10.5868 14.6667 9.46667 14.6667H6.53333C5.41323 14.6667 4.85318 14.6667 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5747C3.33333 13.1468 3.33333 12.5868 3.33333 11.4667V4.00001" stroke="#1B1B1B" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
            </div>
            <button type="button" class="js-second-btn" data-id=${arrKeysStorage[i]}>
              Start
 <svg class="second-arrow-icon" data-id=${arrKeysStorage[i]} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function onFavoriteClickDelete(event) {
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
