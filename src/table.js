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
}