import Todo from "./api";
import {
    addRow
} from "./table"

const api = new Todo();

api.fetchItems().then((data) => {
    for (const item of data) {
        addRow("table", {
            id: item.id,
            title: item.title,
            description: item.description,
            done: item.done,
            priority: item.priority
        })
    }
});

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
        // Akcja zakonczyla sie sukcesem!
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