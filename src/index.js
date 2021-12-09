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