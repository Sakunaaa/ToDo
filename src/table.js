export function addActionsColumn(row, data) {
    const actionsColumn = document.createElement("td")
    const actionsCheckBox = document.createElement("input")
    const deleteButton = document.createElement("button")
    const trashIcon = document.createTextNode("🗑️")
    actionsCheckBox.type = "checkbox"
    actionsCheckBox.name = "checkbox" 
    if (data.done === true) {
        actionsCheckBox.checked = true 
    }
    actionsColumn.appendChild(actionsCheckBox)
    deleteButton.appendChild(trashIcon)
    actionsColumn.appendChild(deleteButton)
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

    if (data.done === true) {
        tr.classList.add("checked") 
    }
    // Jezeli data.done === true, to cos tam
    addActionsColumn(tr, data)
    table.appendChild(tr)
}