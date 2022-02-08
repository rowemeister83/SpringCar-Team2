`use strict`

import * as DOM from './updated-dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`http://localhost:8080/garage/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// Select Garage
const getGar = () => {
  axios.get(`http://localhost:8080/garage/read/${DOM.selectGarage.value.toString()}`)
    .then((response) => {
      DOM.singleOutput.innerHTML = JSON.stringify(response.data)
    }).catch((err) => {
      console.log(err);
    });
}

DOM.selectGarage.onclick = () => getGar();

// Create Garage
const postGar = () => {
  axios.post(`http://localhost:8080/garage/create`, {name : DOM.createGarage.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

DOM.buttonCreate.onclick = () => postGar();

// Update Garage
const updGar = () => { 
  axios.put(`http://localhost:8080/garage/update/${DOM.inputID.value.toString()}`, {name:DOM.inputUpdateName.value,_id:DOM.inputUpdateID.value.toString()})
    .then((response) => {
     console.log(response);
     get();
    }).catch((err) => {
      console.log(err);
    });
}

DOM.buttonUpdate.onclick = () => updGar();

// Delete Garage
const delGar = () => { 
  axios.delete(`http://localhost:8080/garage/delete/${DOM.delGarage.value.toString()}`)
    .then((response) => {
     console.log(response);
     get();
    }).catch((err) => {
      console.log(err);
    });
}

DOM.delGarage.onclick = () => delGar();
© 2022 GitHub, Inc.
Terms
Privacy
