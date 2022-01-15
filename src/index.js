import Todo from "./api";
import {
    addRow, hideTableLoader, showTableLoader
} from "./table"

const api = new Todo();

const form = document.getElementById("newTask-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formElements = form.elements
    const title = formElements["Title"].value
    const description = formElements["Description"].value
    const prio = formElements["Priority"].value

    const params = {
        title,
        // dlatego ze klucz title = zmiennej const title
        description: description,
        priority: prio
    }

    api.addItem(params).then((result) => {
        const item = result.data[0]
        addRow("table", {
            id: item.id,
            title: item.title,
            description: item.description,
            done: item.done,
            priority: item.priority
        })
    })
})

// Chcemy, zeby po kliknieciu w checkbox (obojetnie jaki) uruchamiala się funkcja checkItem/uncheckItem z api.js

// Jezeli jest checkniety, przenies go na sam dol
// Jezeli nie jest checkniety, to ma byc checkniety
const button = document.getElementById("addNewTask-btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content")

button.addEventListener("click", () => {
    modal.showModal();
});

document.addEventListener(
    "click",
    (e) => {
        const withinModalBoundaries = e.composedPath().includes(modalContent)
        const withinButtonBoundaries = e.composedPath().includes(button)
        const isModalOpen = modal.open

        if (!withinModalBoundaries && isModalOpen && !withinButtonBoundaries) {
            modal.close()
        }
    },
    false
)

// tutaj pobierane są itemy z bazy danych
api.fetchItems()
    .then((data) => {
        for (const item of data) {
            addRow("table", {
                id: item.id,
                title: item.title,
                description: item.description,
                done: item.done,
                priority: item.priority
            })
        }
        
        hideTableLoader()

        document.addEventListener("click", (e) => {
            // 1. rejestrujemy klikniecia na calym documencie, a chcemy tylko na checkboxach
            // 2. kiedy juz mamy same checkboxy, sprawdzamy czy klikniety checkbox jest checked/unchecked
            const name = e.target.name
            if (name === "checkbox") {
                const isChecked = e.target.checked 
                const rowElement = e.target.parentElement.parentElement
                const idElement = rowElement.children[0] 
                const id = idElement.innerText
                if (isChecked) {
                    api.checkItem({id})
                } else {
                    api.uncheckItem({id})
                }
            }
        })  
    })
    .catch(error => {
        console.log(error)
        hideTableLoader()
    })

document.addEventListener("click", (e) => {
    const name = e.target.name 
    if (name === "delete") {
        // tutaj "wykrywamy" kliknięcie w smietniczek, więc tutaj chcemy pokazać loader
        const rowElement = e.target.parentElement.parentElement 
        const idElement = rowElement.children[0]
        const id = idElement.innerText

        // ale gdzie chcemy schować loader?
        api.deleteItem({id})
    }
})


// todo:
// 1. dodaj przycisk z ikonką 🗑️ do actions kazdego wiersza w tabeli
// 2. 