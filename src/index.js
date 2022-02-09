import Todo from './api';
import {
  addRow,
  hideTableLoader,
  showTableLoader,
  showDeleteButtonLoader,
  hideDeleteButtonLoader,
} from './table';

const api = new Todo();

const form = document.getElementById('newTask-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = form.elements;
  const title = formElements['Title'].value;
  const description = formElements['Description'].value;
  const prio = formElements['Priority'].value;

  const params = {
    title,
    // dlatego ze klucz title = zmiennej const title
    description: description,
    priority: prio,
  };

  api.addItem(params).then((result) => {
    const item = result.data[0];
    addRow('table', {
      id: item.id,
      title: item.title,
      description: item.description,
      priority: item.priority,
    });
  });
});

// Chcemy, zeby po kliknieciu w checkbox (obojetnie jaki) uruchamiala się funkcja checkItem/uncheckItem z api.js

// Jezeli jest checkniety, przenies go na sam dol
// Jezeli nie jest checkniety, to ma byc checkniety
const button = document.getElementById('addNewTask-btn');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

button.addEventListener('click', () => {
  modal.showModal();
});

document.addEventListener(
  'click',
  (e) => {
    const withinModalBoundaries = e.composedPath().includes(modalContent);
    const withinButtonBoundaries = e.composedPath().includes(button);
    const isModalOpen = modal.open;

    if (!withinModalBoundaries && isModalOpen && !withinButtonBoundaries) {
      modal.close();
    }
  },
  false,
);

const compareItems = (firstItem, secondItem) => {
  if (firstItem.done === false && secondItem.done === true) return -1;
  if (firstItem.done === true && secondItem.done === false) return 1;

  return 0;
};

// tutaj pobierane są itemy z bazy danych
api
  .fetchItems()
  .then((data) => {
    const sortedItems = data.sort(compareItems);
    for (const item of sortedItems) {
      addRow('table', {
        id: item.id,
        title: item.title,
        description: item.description,
        priority: item.priority,
      });
    }

    hideTableLoader();

    document.addEventListener('click', (e) => {
      // 1. rejestrujemy klikniecia na calym documencie, a chcemy tylko na checkboxach
      // 2. kiedy juz mamy same checkboxy, sprawdzamy czy klikniety checkbox jest checked/unchecked
      const name = e.target.name;
      if (name === 'checkbox') {
        const isChecked = e.target.checked;
        const rowElement = e.target.parentElement.parentElement;
        const idElement = rowElement.children[0];
        const id = idElement.innerText;
        const row = rowElement.cloneNode(true);

        if (isChecked) {
          api.checkItem({ id }).then(() => {
            rowElement.parentElement.appendChild(row);
            rowElement.remove();
            row.classList.add('checked');
            // zadanie domowe: niech sie od razu skresla, odkresla
          });
        } else {
          api.uncheckItem({ id }).then(() => {
            rowElement.parentElement.prepend(row);
            rowElement.remove();
            row.classList.remove('checked');
          });
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
    hideTableLoader();
  });

document.addEventListener('click', (e) => {
  const name = e.target.name;
  if (name === 'delete') {
    const button = e.target;
    showDeleteButtonLoader(button);
    // tutaj "wykrywamy" kliknięcie w smietniczek, więc tutaj chcemy pokazać loader
    const rowElement = e.target.parentElement.parentElement;
    const idElement = rowElement.children[0];
    const id = idElement.innerText;

    // ale gdzie chcemy schować loader?
    api
      .deleteItem({ id })
      .then(() => {
        hideDeleteButtonLoader(button);
        rowElement.remove();
      })
      .catch(() => {
        hideDeleteButtonLoader(button);
      });
  }
});

// todo:
// 1. dodaj przycisk z ikonką 🗑️ do actions kazdego wiersza w tabeli
// 2. po nacisnieciu "submit" zamknij modala
// const cookieStorage = {
//   getItem: (key) => {
//     const cookies = document.cookie
//       .split(';')
//       .map((cookie) => cookie.split('='))
//       .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
//     return cookies[key];
//   },
//   setItem: (key, value) => {
//     document.cookie = `${key}=${value}`;
//   },
// };

// const storageType = cookieStorage;
// const consentPropertyName = 'jdc_consent';

// const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
// const saveToStorage = () => storageType.setItem(consentPropertyName, true);

// window.onload = () => {
//   if (shouldShowPopup()) {
//     const consent = confirm(
//       'By using this website, you automaticlly accept that we use cookies.',
//     );
//     if (consent) {
//       saveToStorage();
//     }
//   }
// };
