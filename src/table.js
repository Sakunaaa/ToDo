const createDeleteButton = () => {
    // <img src="logo.svg" alt="logo" />
    const deleteButton = document.createElement("button")
    const trashIcon = document.createTextNode("🗑️")

    deleteButton.appendChild(trashIcon)
    deleteButton.name = "delete"

    return deleteButton
}

function addActionsColumn(row, data) {
    const actionsColumn = document.createElement("td")
    const actionsCheckBox = document.createElement("input")
    const deleteButton = createDeleteButton()
    actionsCheckBox.type = "checkbox"
    actionsCheckBox.name = "checkbox" 
    actionsColumn.classList.add("actionsColumn")
    if (data.done === true) {
        actionsCheckBox.checked = true 
    }
    actionsColumn.appendChild(actionsCheckBox)
    actionsColumn.appendChild(deleteButton)
    row.appendChild(actionsColumn)
}

function addRow(tableId, data) {
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

const TABLE_SELECTOR = "loader"

const showTableLoader = () => {
    const loader = document.getElementById(TABLE_SELECTOR)
    loader.style.display = "block"
}

const hideTableLoader = () => {
    const loader = document.getElementById(TABLE_SELECTOR)
    loader.style.display = "none"
}

export {
    showTableLoader, 
    hideTableLoader, 
    addRow,
}