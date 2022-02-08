`use strict`

import * as DOM from './dom.js';

DOM.readGarageButton.onclick = () => getGarage();
//DOM.getGarageIDButton.onclick = () => identifyGarage();
DOM.newGarageButton.onclick = () => createGarage();
DOM.updateGarageButton.onclick = () => updateGarage();
DOM.deleteGarageButton.onclick = () => deleteGarage();

const writeItem = item => {
    const child = document.createElement(`li`);
    child.id = item._id;
    child.innerHTML = `${JSON.stringify(item)}`;
    DOM.garagesResults.appendChild(child);
  }

  const getGarage = () => {
    DOM.garagesResults.innerHTML = ``;
  
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
  //const identifyGarage = () => {
  
    //DOM.garagesResults.innerHTML = ``;
  
   // axios.get(`http://localhost:8080/garage/read/${DOM.getGarageID.value}`)
     //.then((response) => {
       // console.log(response);
       // DOM.garageOutput.innerHTML = `${JSON.stringify(response.data)}`;
     // }).catch((err) => {
       // console.log(err);
     // });
 // }
  
  const createGarage = () => {
    axios.post(`http://localhost:8080/garage/create`, {name : DOM.garageName.value})
      .then((response) => {
        console.log(response);
        getGarage();
      }).catch((err) => {
        console.log(err);
      });
  }
  
  const deleteGarage = () => {
    btnDelCar.onclick = () => output.innerHTML = (`http://localhost:8080/garageDelete/${DOM.deleteGarageID.value}`)
    axios.delete(`http://localhost:8080/garage/delete/${DOM.deleteGarageID.value}`)
      .then((response) => {
        console.log(response);
        DOM.deleteGarageID.value = "";
        getGarage();
      }).catch((err) => {
        console.log(err);
      });
  }
  
  const updateGarage = () => {
    axios.put(`http://localhost:8080/garage/update/${DOM.updateGarageID.value}`, {name : DOM.updateGarageName.value})
      .then((response) => {
        console.log(response);
        getGarage();
        DOM.updateGarageName.value = "";
        DOM.updateGarageID.value = "";
      }).catch((err) => {
        console.log(err);
      });
  }
  
