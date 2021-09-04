// let url = 'https://jsonplaceholder.typicode.com/todos';
let url = 'http://localhost:3000/notes/';
$(document).ready(function () {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      json.forEach((todo) => {
        let isCompleted = todo.completed ? 'table-success' : 'table-danger';
        let row = `
          <tr id="todoId${
            todo._id
          }"class="${isCompleted}" data-toggle="tooltip" data-placement="top" title="${
          todo.completed
            ? 'Felicidades has completado esta tarea!'
            : 'Aun tienes pendiente esta tarea.'
        }
        "> 
            <th scope="row">${todo._id}</th> 
            <td>${todo.title}</td> 
            <td>${todo.completed}</td>
            <td>
            <button class="btn btn-danger">Eliminar</button>
            <button class="btn btn-primary">Editar</button>
            </td>
          </tr> `;
        $('#tbodyId').append(row);
      });
    });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
