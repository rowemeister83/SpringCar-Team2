`use strict`

const btnFetch = document.getElementById(`btnFetchAll`);
const btnAddCar = document.getElementById(`btnAddCar`);
const btnDelCar = document.getElementById(`btnDelCar`);
const btnUpdCar = document.getElementById(`btnUpdCar`);
const output = document.getElementById(`output`);
const carID = document.getElementById(`input_carID`);
const carName = document.getElementById(`input_name`);
const carColour = document.getElementById(`input_colour`);
const carMake = document.getElementById(`input_make`);
const carModel = document.getElementById(`input_model`);
const carDoors = document.getElementById(`input_doors`);
const carGarageID = document.getElementById(`input_garageID`);
const carGarageName = document.getElementById(`input_garageName`);

//Identify all cars - list cars
fetchUrl = `http://localhost:8080/car/read`
const fetch = (URL) => {
    axios.get(URL)
        .then((response) => {
            output.innerHTML = JSON.stringify(response.data);
        }).catch((err) => {
            output.innerHTML = 'Error Occurred Please Try Again.';
            console.log(err);
        })
}

//Add new cars to the DB
const create = () => {
    axios.post(`http://localhost:8080/car/create`, 
        {
            id: carID.value,
            name: carName.value,
            colour: carColour.value,
            make: carMake.value,
            model: carModel.value,
            doors: carDoors.value,
            garage: {
              id: carGarageID.value,
              name: carGarageName.value,
              cars: null
            }
          }
    )
        .then((response) => {
            output.innerHTML = JSON.stringify(response.data);
        }).catch((err) => {
            output.innerHTML = 'Error Occurred Please Try Again.';
            console.log(err);
        })
}

//Update a currently added car
const update = () => {
    axios.put(`http://localhost:8080/car/update/${carID.value}`, {
        id: carID.value,
        name: carName.value,
        colour: carColour.value,
        make: carMake.value,
        model: carModel.value,
        doors: carDoors.value,
        garage: {
          id: carGarageID.value,
          name: carGarageName.value,
          cars: null
        }
    })
      .then((response) => {
        output.innerHTML = JSON.stringify(response.data);
        console.log(response);
      }).catch((err) => {
        output.innerHTML = 'Error Occurred Please Try Again.';
        console.log(err);
      });
  }

  
  //Delete a car from the DB
  const deleteCar = () => {
    axios.delete(`http://localhost:8080/car/delete/${carID.value}`)
      .then((response) => {
        console.log(response);
        carID.value = "";
      }).catch((err) => {
        output.innerHTML = 'Error Occurred Please Try Again.';
        console.log(err);
      });
  }

btnFetchAll.onclick = () => fetch(fetchUrl);
btnAddCar.addEventListener('click', () => create(`http://localhost:8080/car/create/`));
btnDelCar.addEventListener('click', () => deleteCar(`http://localhost:8080/car/delete/${carID.value}`));
btnUpdCar.addEventListener('click', () => update(`http://localhost:8080/car/update/${carID.value}`));
