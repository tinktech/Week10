// Week 10: JS & DOM Coding Assignment

class Item {
  constructor(name, department) {
    this.name = name; // item name
    this.department = department; // item department location
  }
}

class Store {
  constructor(id, name) {
    this.id = id; // store id number
    this.name = name;  // store name
    this.items = []; // items array(per store)
  }

  addItem(item) {
    this.items.push(item);
  } // add item to store

  deleteItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  } // delete item from store
}

let stores = []; // stores array
let storeId = 0; // store id number(set to 0)

onClick('new-store', () => {
  stores.push(new Store(storeId++, getValue('new-store-name'))); // calling value from html form
  drawDOM();
}); // creates a new store and creates a new table

function onClick(id, action) {
  let element = document.getElementById(id);
    element.addEventListener('click', action);
  return element;
} // button on click function

function getValue(id) {
  return document.getElementById(id).value;
} // returns element id value

function drawDOM() {
  let storeDiv = document.getElementById('stores');
  clearElement(storeDiv);
  for (store of stores) { // DOM for stores
    let table = createStoreTable(store); // defining table
    let title = document.createElement('h4'); // creating <h4> header
      title.innerHTML = `${store.name} `; // prints store name to title
      title.appendChild(createStoreDeleteButton(store)); // adds store delete button to title
    storeDiv.appendChild(title); // div for title
    storeDiv.appendChild(table); // div for table

    for (item of store.items) { // DOM for store items
      createItemRow(store, table, item); 
    }
  }
}

function createItemRow(store, table, item) {
  let row = table.insertRow(2); // 3 column row
    row.insertCell(0).innerHTML = item.name; // item name column
    row.insertCell(1).innerHTML = item.department; // item department column
  let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(store, item)); // delete button column
}

function createDeleteRowButton(store, item) {
  let btn = document.createElement('button'); // create <button>
    btn.className = 'btn btn-secondary'; // button class
    btn.innerHTML = 'Delete'; // button text
    btn.onclick = () => { // function to delete item row elements
      let index = store.items.indexOf(item);
      store.items.splice(index, 1);
      drawDOM();
    };
  return btn;
}

function createStoreDeleteButton(store) {
  let btn = document.createElement('button'); // create <button>
    btn.className = 'btn btn-secondary'; // button class
    btn.innerHTML = 'Delete Store'; // button text
    btn.onclick = () => { // function to delete store
      let index = stores.indexOf(store);
      stores.splice(index, 1);
      drawDOM();
    };
  return btn;
}

function createNewItemButton(store) {
  let btn = document.createElement('button'); // create <button>
    btn.className = 'btn btn-secondary'; // button class
    btn.innerHTML = 'Create'; // button text
    btn.onclick = () => { // function to create new item with name and department fields
      store.items.push(new Item(getValue(`name-input-${store.id}`), getValue(`department-input-${store.id}`)));
      drawDOM();
    };
  return btn;
}

function createStoreTable(store) {
  let table = document.createElement('table'); // create <table>
    table.setAttribute('class', 'table table-striped table-bordered'); // defining table class
  let row = table.insertRow(0); // first table row
  let nameColumn = document.createElement('th'); // create item name <th>
  let departmentColumn = document.createElement('th'); // create department <th>
  let gapColumn = document.createElement('th'); // create empty <th>
    nameColumn.innerHTML = 'Item'; // item name header
    departmentColumn.innerHTML = 'Department'; // item department header
    gapColumn.innerHTML = ''; // empty header
  row.appendChild(nameColumn);
  row.appendChild(departmentColumn);
  row.appendChild(gapColumn);

  let formRow = table.insertRow(1); // second table row
  let nameTd = document.createElement('td'); // create item name <td>
  let departmentTd = document.createElement('td'); // create department <td>
  let createTd = document.createElement('td'); // create create button <td>
    let nameInput = document.createElement('input'); // create item name <input>
      nameInput.setAttribute('id', `name-input-${store.id}`); // set input id
      nameInput.setAttribute('type', 'text'); // set input type
      nameInput.setAttribute('class', 'form-control'); // set input class

    let departmentInput = document.createElement('input'); // create department <input>
      departmentInput.setAttribute('id', `department-input-${store.id}`); // set input id
      departmentInput.setAttribute('type', 'text'); // set input type
      departmentInput.setAttribute('class', 'form-control'); // set input class

    let newItemButton = createNewItemButton(store); // create new item button
  nameTd.appendChild(nameInput);
  departmentTd.appendChild(departmentInput);
  createTd.appendChild(newItemButton);
  formRow.appendChild(nameTd);
  formRow.appendChild(departmentTd);
  formRow.appendChild(createTd);
  return table;
}

function clearElement(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}