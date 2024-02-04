
let paragraphId = 0;

document.getElementById('p-button').addEventListener('click', () => {

  let parent = document.getElementById('p-div');

  let newElement = document.createElement('p');
  newElement.textContent = document.getElementById('p-input').value;
  newElement.setAttribute('id', paragraphId++);

  parent.appendChild(newElement);

  document.getElementById('p-input').value = '';
});
