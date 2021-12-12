// tableId = string
// data = obiekt

// const data = {
//     firstName: "Adrian",
//     lastName: "Pilarczyk"    
// }


// Object.keys(data).forEach(key => {
//     console.log(key)
//     data["firstName"]
//     data["lastName"]
//     console.log(data[key])
// })

export function addRow(tableId, data) {
    const table = document.getElementById(tableId)
    const tr = document.createElement("tr")
    Object.keys(data).forEach(key => {
        const text = document.createTextNode(data[key])
        const td = document.createElement("td")
        td.appendChild(text)
        tr.appendChild(td)
    })
    table.appendChild(tr)
    // tyle razy ile jest KLUCZY w data chcemy utworzyć td
    // Chcemy zeby ta funkcja dodawala wiersz do wskazanej tabeli 
}

