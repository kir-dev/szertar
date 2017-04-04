function changed() {
    var dropdown = document.getElementById("dropdown");
    if (dropdown.value === "newItem") {
        addNewItem();
    } else {
        clearDiv();
    }
}

function addNewItem() {
    var inputDiv = document.getElementById("newItemInputDiv");
    var inputField = document.createElement("INPUT");
    inputField.setAttribute("type", "text");
    inputField.placeholder = "Új tárgy neve";
    inputField.required = true;
    inputField.name = "newItem";
    inputDiv.appendChild(inputField);
}

function clearDiv() {
    var div = document.getElementById("newItemInputDiv");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}   