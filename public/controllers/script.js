var puntaje = localStorage.getItem('puntaje');
var materia = localStorage.getItem('materia');
//createForm(puntaje)
function createForm(puntaje,rango,materia){

  const content=document.getElementById('usuarios')
  content.innerHTML = ` 
  <form id="user-form" enctype="multipart/form-data">
      <input type="hidden" name="puntaje" value="${puntaje}">
      <input type="hidden" name="materia" value="${materia}">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Nombre Encuestado</label>
        <div class="col-sm-4">
          <input type="text" class="form-control bg-secondary text-white" name="nombre" placeholder="Ingrese el nombre" id="nameU" onkeydown="return soloLetras(event)">
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label" hidden>Rango Obtenido</label>
          <div class="col-sm-4">
          <input type="hidden" name="posrango" value="${rango}" readonly class="form-control bg-secondary text-white">
        </div>
      </div>
      <button type="submit" class="btn btn-warning" onclick="createUserScore()">Guardar Historial</button>
      <button type="button" class="btn btn-warning" onclick="mostHistorial()">Mostrar Historial</button>
  </form>`
}
function createFormRol(){

  const content=document.getElementById('rolesU')

  content.innerHTML = ` 
  <form id="rol-form" enctype="multipart/form-data">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Nombre Rol</label>
        <div class="col-sm-4">
          <input type="text" class="form-control bg-secondary text-white" name="nombreRol" placeholder="Ingrese el nombre" id="nameU" onkeydown="return soloLetras(event)">
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label" hidden>Rango Obtenido</label>
          <div class="col-sm-4">
        </div>
      </div>
      <button type="submit" class="btn btn-warning" onclick="createRol()">Guardar Historial</button>
  </form>`
}

function soloLetras(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnñopqrstuvwxyz";
  
  // Permitir borrar (Backspace) y dar espacios (Space)
  if (key === 8 || key === 32) {
    return true;
  }

  if (letras.indexOf(tecla) === -1) {
    // Si la tecla presionada no es una letra, se previene la entrada
    event.preventDefault();
    return false;
  }
}

const createUserScore = () =>{
  const userForm = document.getElementById('user-form')
  userForm.onsubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData(userForm)
   // console.log(formData.get('puntaje'));
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    await fetch('/users',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
  alert('El puntaje ha sido almacenado')
  getUsers()
}
const createRol = () =>{
  const userForm = document.getElementById('rol-form')
  userForm.onsubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData(userForm)
   // console.log(formData.get('puntaje'));
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    await fetch('/roles',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
  alert('El puntaje ha sido almacenado')
  getUsers()
}
/*
const loadFile = () => {
  const userFile = document.getElementById('formArchivo')
  userFile.onsubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData(userFile)
   // console.log(formData.get('puntaje'));
    const data = Object.fromEntries(formData.entries())
    console.log(data);
    await fetch('/files',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
}
*/
function mostHistorial(){

    var divhisto = document.getElementById('list')
    
    if (divhisto.style.display === "none") {
        divhisto.style.display = "block"
        getUsers()
        getRoles()
        getFiles()
    } else {
      divhisto.style.display ="none"
    }
}
function mostFiles(){

  var divhisto = document.getElementById('fileTBL')
  
  if (divhisto.style.display === "none") {
      divhisto.style.display = "block"
      getFiles()
  } else {
    divhisto.style.display ="none"
  }
}
const getUsers = async () => {
  const response = await fetch('/users')
  const users = await response.json()
  console.log(users);
  const template = userLi => `
        <tr>
            <td>${userLi.puntaje}</td>
            <td>${userLi.posrango}</td>
            <td>${userLi.nombre}</td>
            <td>${userLi.materia}</td>
          <td>
            <button data-id="${userLi._id}" class="btn btn-danger">Eliminar</button>
            <button data-id="${userLi._id}" class="updateButton btn btn-primary">Actualizar</button>
          </td>
        </tr>
  `
  const userList = document.getElementById('listTBL')
  const bodyTbl = userList.querySelector('#bodyTable')

  bodyTbl.innerHTML = users.map(user => template(user)).join('')

  users.forEach(user => {
    const userNode = document.querySelector(`[data-id="${user._id}"]`)
    userNode.onclick = async e =>{
      await fetch(`/users/${user._id}`,{
        method: 'DELETE',
      })
      //userNode.parentNode.remove()
      getUsers()
      alert('Usuario eliminado')
    }
    const updateButton = document.querySelector(`[data-id="${user._id}"].updateButton`);
    updateButton.onclick = e => {
      e.preventDefault();
      fillFormWithUserData(user);
      const form = document.getElementById('userForm');
      const updateButton = document.getElementById('updateButton');
      updateButton.onclick = async () => {
        const updatedUser = {
          puntaje: form.elements['puntaje'].value,
          posrango: form.elements['posrango'].value,
          nombre: form.elements['nombre'].value,
          materia: form.elements['materia'].value,
        };
        await fetch(`/users/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUser),
        });
        getUsers();
        alert('Usuario actualizado');
        form.reset();
      };
    }
  })
}

const getRoles = async () => {
  const response = await fetch('/roles')
  const roles = await response.json()
  console.log(roles);
  const template = rolLi => `
        <tr>
            <td>${rolLi.nombreRol}</td>
          <td>
            <button data-id="${rolLi._id}" class="btn btn-danger">Eliminar</button>
            <button data-id="${rolLi._id}" class="updateButtonRol btn btn-primary">Actualizar</button>
          </td>
        </tr>
  `
  const userList = document.getElementById('listTBLRol')
  const bodyTbl = userList.querySelector('#bodyTable')

  bodyTbl.innerHTML = roles.map(rol => template(rol)).join('')

  roles.forEach(rol => {
    const rolNode = document.querySelector(`[data-id="${rol._id}"]`)
    rolNode.onclick = async e =>{
      await fetch(`/roles/${rol._id}`,{
        method: 'DELETE',
      })
      //userNode.parentNode.remove()
      getRoles()
      alert('Rol eliminado')
    }

    const updateButton = document.querySelector(`[data-id="${rol._id}"].updateButtonRol`);
    updateButton.onclick = e => {
      e.preventDefault();
      fillFormWithUserData(rol);
      const form = document.getElementById('rolForm');
      const updateButtonRol = document.getElementById('updateButtonRol');

      updateButtonRol.onclick = async () => {
        const updatedRol = {
          nombreRol: form.elements['nombreRol'].value,
        };
        await fetch(`/roles/${rol._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedRol),
        });
        getRoles();
        alert('Rol actualizado');
        form.reset();
      };
    }
  })
}

const fillFormWithUserData = rol => {
  const form = document.getElementById('rolForm');
  form.elements['nombreRol'].value = rol.nombreRol;
};


function closeModal() {
  // Eliminar el modal del documento
  const modal = document.querySelector('.modal');
  modal.parentNode.removeChild(modal);
}

const makeGraphs = async () => {

  const res = await fetch('/users')
  const userData = await res.json()


    fetch('/graphs',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(resData =>{
      console.log(resData);
    })
    .catch(error =>{
      console.log(error);
    })

 }

//window.onre

const getFiles = async () => {
  const response = await fetch('/archivos')
  const files = await response.json()
  //console.log(users);
  const template = userFile => `
        <tr>
          <td>${userFile.name}</td>
          <td>${userFile.contentType}</td>
        </tr>
  `
  const fileList = document.getElementById('listTBLF')
  const bodyTbl = fileList.querySelector('#bodyTableF')

  bodyTbl.innerHTML = files.map(file => template(file)).join('')
}

/** <ol class="list-group list-group-horizontal">
          <li class="list-group-item">
            ${userLi.puntaje}
          </li>
          <li class="list-group-item">
            ${userLi.posrango}
          </li>
          <li class="list-group-item">
            ${userLi.nombre}
          </li>
        </ol>*/


function encontrarRango(valor, rangos) {
  for (var i = 0; i < rangos.length; i++) {
    var rango = rangos[i];
    var inicio = rango[0];
    var fin = rango[1];
    
    if (valor >= inicio && valor <= fin) {
      return i; // Índice del rango donde se encuentra el valor
    }
  }
  
  return -1; // Si el valor no se encuentra en ningún rango
}
function crearRango(puntaje){

  var rangos = [
    [32,64], // rango 0
    [96,128], // rango 1
    [160,192], // rango 2
    [225,400] // rango 3
  ];

    var rangoObtenido = encontrarRango(puntaje,rangos);

    if (rangoObtenido !== -1) {
      console.log("El valor", puntaje, "se encuentra en el rango", rangoObtenido);
      return rangoObtenido
    } else {
      console.log("El valor", puntaje, "no se encuentra en ningún rango");
      return rangoObtenido
    }

  }


const cargarGraficas = () =>{
// Get the canvas element
var canvas1 = document.getElementById('myChart');
var canvas2 = document.getElementById('myChart2');



// Create a new Chart object
var myChart = new Chart(canvas1, {
  type: 'bar',
  data: {
    labels: ['Puntaje'],
    datasets: [{
      label: 'Puntaje obtenido',
      data: [puntaje],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
var myChart = new Chart(canvas2, {
  type: 'bar',
  data: {
    labels: ['Nv1-A', 'Nv2-A', 'Nv3-A', 'Nv1-B', 'Nv2-B', 'Nv1-C', 'Nv2-C'],
    datasets: [{
      label: 'Nivel de aprendizaje',
      data: [32.1428,64.2856,96.4284, 128.5712, 160.717, 192.8598, 225],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
}
 


window.onload = () =>{
  var puntaje = localStorage.getItem('puntaje');
  var materia = localStorage.getItem('materia');
  console.log('soy la : ',materia);
  cargarGraficas()
  createForm(puntaje,crearRango(puntaje),materia)
  createFormRol()

  makeGraphs()
  //getUsers()
  //createUserScore()
}
