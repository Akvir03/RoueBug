axios.get('http://localhost:3001/userwheels')
  .then(response => {
    const wheelsData = response.data;
    const tableauMesRoues = document.getElementById('tableauMesRoues').getElementsByTagName('tbody')[0];

    tableauMesRoues.innerHTML = '';

    wheelsData.forEach(wheel => {
      const newRow = tableauMesRoues.insertRow();
      newRow.innerHTML = `
        <td>${wheel.nom}</td>
      `;


      wheel.restaurants.forEach(restaurant => {
        newRow.innerHTML += `<td>${restaurant}</td>`;
        });
    });
  })
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });
