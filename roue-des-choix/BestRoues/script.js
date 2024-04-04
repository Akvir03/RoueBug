axios.get('http://localhost:3001/topwheels')
  .then(response => {
    const wheelsData = response.data;
    const tableauMesRoues = document.getElementById('tableauMesRoues').getElementsByTagName('tbody')[0];
    console.log(wheelsData);

    tableauMesRoues.innerHTML = '';

    wheelsData.forEach(wheel => {
      const newRow = tableauMesRoues.insertRow();
      newRow.innerHTML = `
        <td>${wheel.utilisations}</td>
      `;


      wheel.restaurants.forEach(restaurant => {
        newRow.innerHTML += `<td>${restaurant}</td>`;
        });

    });
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });
