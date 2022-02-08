const btnReadGarage = document.getElementById(`readGarageButton`);
const output = document.getElementById(`output`);
const btnAddGarage = document.getElementById(`newGarageButton`);
const garageName = document.getElementById(`garageName`);
const updateGarageID = document.getElementById(`updateGarageID`);
const updateGarageName = document.getElementById(`updateGarageName`);
const btnUpdGarage = document.getElementById(`updateGarageButton`);
const btnDelGarage = document.getElementById(`deleteGarageButton`);
const delGarageID = document.getElementById(`deleteGarageID`);

//displays all garages
const fetch = (URL) => {
    axios.get(URL)
        .then((response) => {
            output.innerHTML = JSON.stringify(response.data);
        }).catch((err) => {
            output.innerHTML = 'Error Occurred Please Try Again.';
            console.log(err);
        })
}

//creates a new garage
const create = () => {
    axios.post(`http://localhost:8080/garage/create`, 
    {
        "id": 0,
        "name": garageName.value,
        "cars": null
    }
    )
        .then((response) => {
            output.innerHTML = JSON.stringify(response.data);
        }).catch((err) => {
            output.innerHTML = 'Error Occurred Please Try Again.';
            console.log(err);
        })
}


//updates an existing garage
const update = () => {
    axios.put(`http://localhost:8080/garage/update/${updateGarageID.value}`, {
        "id": updateGarageID.value,
        "name": updateGarageName.value,
        "cars": null
      })
      .then((response) => {
        output.innerHTML = JSON.stringify(response.data);
        console.log(response);
      }).catch((err) => {
        output.innerHTML = 'Error Occurred Please Try Again.';
        console.log(err);
      });
  }

//delete garages
const deleteGarage = () => {
    axios.delete(`http://localhost:8080/garage/delete/${delGarageID.value}`)
      .then((response) => {
        console.log(response);
        delGarageID.value = "";
      }).catch((err) => {
        output.innerHTML = 'Error Occurred Please Try Again.';
        console.log(err);
      });
  }

btnReadGarage.addEventListener('click', () => fetch(`http://localhost:8080/garage/read`));
btnAddGarage.addEventListener('click', () => create(`http://localhost:8080/garage/create`));
btnUpdGarage.addEventListener('click', () => update(`http://localhost:8080/garage/update/${updateGarageID.value}`));
btnDelGarage.addEventListener('click', () => deleteGarage(`http://localhost:8080/garage/delete/${delGarageID.value}`));