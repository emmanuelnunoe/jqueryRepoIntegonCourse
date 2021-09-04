$(document).ready(despliegaNotas);
$('#updateNote').hide();

let apiUrl = 'http://localhost:3000/notes/';
function despliegaNotas() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);

      json.forEach((note) => {
        $('#notas-container').append(
          `
          <div class="card" style="width: 18rem;"  id="${note._id}">
            <div class="card">
              <h5 class="card-header card-title">${note.title}</h5>
              <div class="card-body">
              <p class="card-text  text-success">${note.content}</p>
              <p >created at: ${note.createdAt}</p>
              <p>updated at: ${note.updatedAt}</p>
              <a href="#" class=" btn btn-primary editarNota" id="${note._id}" >Edit</a>
              <a class="eliminarNota btn btn-danger " href="#" id="${note._id}">Delete</a>
              </div>
            </div>
          </div>
        `
        );
      });
      // on click edit Note
      $('a.editarNota').click((event) => {
        event.preventDefault();
        let noteId = event.target.id;
        console.log(noteId);
        update(noteId);
      });
      // on click  delete Note
      $('a.eliminarNota').click((event) => {
        event.preventDefault();
        alert('eliminar ' + event.target.id);
        let id = event.target.id;
        fetch(apiUrl + id, {
          method: 'DELETE',
        }).then(function () {
          despliegaNotas();
        });
      });
    });
}

// on click create Note
$('#createNote').click(function (event) {
  event.preventDefault();
  create();
});
// function to create a Note
async function create() {
  var titulo = $('#titulo').val();
  var contenido = $('#contenido').val();

  console.log(titulo, contenido);

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    title: titulo,
    content: contenido,
  });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  console.log('ejecuta create');
  fetch(apiUrl, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
    .finally(function () {
      despliegaNotas();
    });
}

// function to update a Note
async function update(noteId) {
  $('#createNote').hide();
  $('#updateNote').show();

  // get Note content
  var note = await fetch(apiUrl + noteId)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  // place content in form
  $('#titulo').val(`${note.title}`);
  $('#contenido').val(`${note.content}`);

  $('#updateNote').click(function () {
    // get new content from form
    var titulo = $('#titulo').val();
    var contenido = $('#contenido').val();

    // prepare put
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    var raw = JSON.stringify({
      title: titulo,
      content: contenido,
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    console.log('ejecuta update');
    console.log(apiUrl + noteId);
    fetch(apiUrl + noteId, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
      .finally(function () {
        despliegaNotas();
      });

    $('#updateNote').hide();
    $('#createNote').show();
  });
}
