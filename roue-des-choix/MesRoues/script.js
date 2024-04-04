// axios
//   .get("http://localhost:3001/userwheels")
//   .then((response) => {
//     const wheelsData = response.data;
//     console.log(wheelsData);
//     const tableauMesRoues = document
//       .getElementById("tableauMesRoues")
//       .getElementsByTagName("tbody")[0];

//     tableauMesRoues.innerHTML = "";

//     wheelsData.forEach((wheel) => {
//       const newRow = tableauMesRoues.insertRow();

//       wheel.restaurants.forEach((restaurant) => {
//         newRow.innerHTML += `<td>${restaurant}</td>`;
//       });
//       newRow.innerHTML += `<td>
//           <button data-id="${wheel._id}" class="btn" onclick=retrieveId()>DELETE</button>
//         </td>`;
//     });
//   })
//   .catch((error) => {
//     console.error(
//       "Une erreur est survenue lors de la récupération des données :",
//       error
//     );
//   });

function fetchAndDisplayWheelsData() {
  axios
    .get("http://localhost:3001/userwheels")
    .then((response) => {
      const wheelsData = response.data;
      console.log(wheelsData);
      const tableauMesRoues = document
        .getElementById("tableauMesRoues")
        .getElementsByTagName("tbody")[0];

      tableauMesRoues.innerHTML = "";

      wheelsData.forEach((wheel) => {
        const newRow = tableauMesRoues.insertRow();

        wheel.restaurants.forEach((restaurant) => {
          newRow.innerHTML += `<td>${restaurant}</td>`;
        });
        newRow.innerHTML += `<td>
          <button data-id="${wheel._id}" class="btn" onclick=retrieveId()>DELETE</button>
        </td>`;
        console.log(wheel._id);
      });
    })
    .catch((error) => {
      console.error(
        "Une erreur est survenue lors de la récupération des données :",
        error
      );
    });
}

fetchAndDisplayWheelsData();

function deleteWheel(id) {
  const idWheel = { id: id };
  console.log(idWheel);
  axios
    .delete("http://localhost:3001/userwheels", { params: idWheel })
    .then((response) => {
      console.log("ok");
      fetchAndDisplayWheelsData();
    });
}

function retrieveId() {
  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-id");
      console.log("ID du bouton cliqué : ", id);
      console.log(id);
      button.removeEventListener("click", arguments.callee);
      deleteWheel(id);
    });
  });
}
