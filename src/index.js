import Todo from "./api";
import {
    addRow
} from "./createRow"

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

// Zadanie domowe: dodawanie itema
// zrób formularz pod tabelą, który po zasubmitowaniu będzie dodawał item
const form = document.getElementById("newTask-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formElements = form.elements 
    const id = formElements["Id"].value 
    const title = formElements["Title"].value 
    const description = formElements["Description"].value 
    const done = formElements["Done"].value 
    const priority = formElements["Priority"].value 

    const newRow = addRow("table", [id, title, description, done, priority])

})