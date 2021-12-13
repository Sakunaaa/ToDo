export function addActionsColumn(row) {
    const actionsColumn = document.createElement("td")
    const actionsCheckBox = document.createElement("input")
    actionsCheckBox.type = "checkbox"
    actionsColumn.appendChild(actionsCheckBox)
    row.appendChild(actionsColumn)
}

export function addRow(tableId, data) {
    const table = document.getElementById(tableId)
    const tr = document.createElement("tr")
    Object.keys(data).forEach(key => {
        const text = document.createTextNode(data[key])
        const td = document.createElement("td")
        td.appendChild(text)
        tr.appendChild(td)
    })
    addActionsColumn(tr)
    table.appendChild(tr)
}