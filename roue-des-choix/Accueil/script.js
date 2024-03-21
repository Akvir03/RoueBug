document.getElementById('submitBtn').onclick = function () {
  const colors = ["red", "green", "blue", "purple", "orange", "yellow", "pink", "cyan"];
  let restaurants = [];
  for (let i = 1; i <= 8; i++) {
    let restaurantName = document.getElementById('restaurant' + i).value.trim();
    if (restaurantName) {
      restaurants.push({ name: restaurantName, color: colors[i - 1] });
    }
  }

  const wheel = document.getElementById('wheel');
  if (restaurants.length > 0) {
    let angle = 360 / restaurants.length;
    let gradientArray = [];
    for (let i = 0; i < restaurants.length; i++) {
      gradientArray.push(`${restaurants[i].color} ${angle * i}deg ${angle * (i + 1)}deg`);
    }

    wheel.style.backgroundImage = `conic-gradient(${gradientArray.join(', ')})`;
    wheel.style.border = '16px solid transparent';
  } else {
    wheel.style.backgroundImage = 'none';
  }

  document.getElementById('legend').innerHTML = restaurants.map(restaurant => {
    return `<div><span class="color-box" style="background-color: ${restaurant.color};"></span>${restaurant.name}</div>`;
  }).join('');

  document.getElementById('spinBtn').style.display = 'block';
};

document.getElementById('spinBtn').onclick = function () {
  var wheel = document.getElementById('wheel');
  var degree = Math.floor(5000 + Math.random() * 5000);
  var spins = "rotate(" + degree + "deg)";
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = spins;

};
document.addEventListener('DOMContentLoaded', function () {
  const spinBtn = document.getElementById('spinBtn');

  spinBtn.addEventListener('click', function () {
    const username = localStorage.getItem('username');

    const restaurants = [];
    for (let i = 1; i <= 8; i++) {
      const restaurantInput = document.getElementById(`restaurant${i}`).value.trim();
      if (restaurantInput) {
        restaurants.push(restaurantInput);
      }
    }

    if (restaurants.length >= 1) {
      const data = { username };
      restaurants.forEach((restaurant, index) => {
        data[`id${index + 1}`] = restaurant;
      });

      // Make the POST request to the /wheelregister route
      axios.post('http://localhost:3001/wheelregister', data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
        .then(function (response) {
          console.log("Enregistrement OK", response.data);
        })
        .catch(function (error) {
          console.error("Error enregistrement", error);
        });
    }
  });
});

