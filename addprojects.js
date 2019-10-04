"use strict";

// **shudder** Global Variables!
var projectList = [];
var projectData = {
    projectName: "",
    projectId: 0
};

function resetAddProjectControls() {
    // reset form items to their origianl placeholder values
    document.getElementById("newProjectName").value = "";
    document.getElementById("newProjectId").value = "";
}

function onAddNewProject() {
    var projectName = document.getElementById("newProjectName").value;
    var projectId = document.getElementById("newProjectId").value;

    resetAddProjectControls();

    if (projectName === "") {
        alert("Project Name cannot be blank");
        document.getElementById("newProjectName").focus();
        return;
    }

    // show new item in test field
    var testDisplayField = document.getElementById("testDisplay");
    testDisplayField.innerHTML = "Project Name = " + projectName + "<br>" + "Project Id = " + projectId;

    addProjectDataToList(projectName, projectId);
}

function addProjectDataToList(name, id) {
    projectData.projectName = name;
    projectData.projectId = id;
    projectList.push(projectData);

    console.log(projectData);
    console.log(projectList);

    createProjectDisplayRow(name, id);
}

function getTagIdentifer(str1, str2) {
    if (typeof str1 != "string" || typeof str2 != "string") {
        console.error("One of these isn't a string: ", str1, str2);
    }
    
    return str1 + str2;
}

function createProjectDisplayRow(name, id) {
    var row = document.createElement("div");
    row.className = "w3-row";
    row.id = getTagIdentifer(name, id);

    var col = createProjectDisplayColumn(name);
    row.appendChild(col);

    col = createProjectDisplayColumn(id);
    row.appendChild(col);

    col = createProjectDisplayRemoveButton(name, id);
    row.appendChild(col);

    document.getElementById("projectDisplayArea").appendChild(row);
}

// return: "div" element as a column for w3
function createProjectDisplayColumn(display) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var node = document.createTextNode(display);
    col.appendChild(node);

    return col;
}

function createProjectDisplayRemoveButton(name, id) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var button = document.createElement("button");
    var buttonFuncStr = "onRemoveRow(" + getTagIdentifer(name, id) + ")";
    button.id = "button" + getTagIdentifer(name, id);
    button.setAttribute = buttonFuncStr;
    button.textContent = "Remove";
    
    col.appendChild(button);

    return col;
}

function onRemoveRow(rowId) {
    document.getElementById(rowId).remove();
}