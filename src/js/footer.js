import axios from 'axios';

const formEl = document.querySelector('.js-footer-form');

formEl.addEventListener('submit', setEmail);

// const validateEmail = userEmail => {
//   const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   console.log(test(userEmail));
// };
////////////перевірити цей паттерн, перенести let regex
// let regex = new RegExp('/^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$/');
let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

function setEmail(event) {
  event.preventDefault();
  let userEmail = event.target.elements.email.value.trim();

  console.log(regex.test(userEmail));

  if (regex.test(userEmail)) {
    if (userEmail === '') {
      alert('please, enter your email');
      return;
    }

    const result = {
      email: userEmail,
    };

    async function getPostSubscription() {
      //   axios.defaults.baseURL = 'https://energyflow.b.goit.study/api/';
      try {
        const response = await axios.post('subscription', result);

        // console.log(response);
        // console.log(response.status);

        // if (response.status === 409) {
        //   alert('Subscription already exists');
        // } else {
        alert(response.data.message);
        // }
        formEl.reset();
      } catch (error) {
        alert('Subscription already exists');
      }
    }

    getPostSubscription();
  }
}
