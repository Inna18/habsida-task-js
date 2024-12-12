let dummyList = [];
let checkedList = [];
let index = 0;

let inputValue = document.querySelector('.todo-input');
let list = document.querySelector('.todo-list');
list.classList.add('list');

let addBtn = document.querySelector('.add-btn');
let deleteSelectBtn = document.querySelector('.delete-select-btn');

const checkBtnDisabled = () => {
  if (inputValue.value.trim() !== '') addBtn.disabled = false;
  else addBtn.disabled = true;
};
const addNewToDo = (e) => {
  // create li element and append input, span and button as children
  let item = document.createElement('li');
  item.setAttribute('id', index);
  item.innerHTML = `
        <div>
            <input type="checkbox" onclick="addToChecked(${index})" />
            <span>${inputValue.value}</span>
        </div>
        <button onclick="deleteItem(${index})">-</button>
    `;
  list.appendChild(item);

  // save data to dummyList
  dummyList.push({ id: index++, value: inputValue.value });
  console.log('Todo List: ', dummyList);

  // make inputValue empty after submit
  inputValue.value = '';
  // disable Add button again after submit
  addBtn.disabled = true;
};

const addToChecked = (id) => {
  if (checkedList.includes(id)) {
    checkedList = checkedList.filter((checked) => checked !== id);
  } else {
    checkedList.push(id);
  }
  // check if checkedList empty and enable/disable list btn
  if (checkedList.length > 0) deleteSelectBtn.disabled = false;
  else deleteSelectBtn.disabled = true;

  console.log('Checked ids list: ', checkedList);
};

const deleteItem = (id) => {
  let deleteElem = document.getElementById(id);
  console.log('Item to delete: ', deleteElem);
  list.removeChild(deleteElem);

  // check if deleted item was checked and if yes, remove it from checkedList
  checkedList = checkedList.filter((check) => check !== id);
  if (checkedList.length > 0) deleteSelectBtn.disabled = false;
  else deleteSelectBtn.disabled = true;
};

const deleteSelected = () => {
  // remove from DOM
  console.log('Selected items: ', checkedList);
  checkedList.forEach((checkedItem) => {
    let checkedElem = document.getElementById(checkedItem);
    list.removeChild(checkedElem);
  });

  // remove from dummyList
  dummyList = dummyList.filter((item) => !checkedList.includes(item.id));
  console.log('Items left: ', dummyList);

  // empty checkedList after Delete selected
  checkedList = [];

  // check if checkedList empty and enable/disable list btn
  if (checkedList.length > 0) deleteSelectBtn.disabled = false;
  else deleteSelectBtn.disabled = true;
};
