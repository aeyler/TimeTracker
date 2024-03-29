"use strict";

function resetAddProjectControls() {
    // reset form items to their origianl placeholder values
    var projNameInput = document.getElementById("proj_newProjectName");
    projNameInput.value = "";
    projNameInput.focus();

    var projIdInput = document.getElementById("proj_newProjectId");
    projIdInput.value = "";
}

function debug_displayCurrentProgramItem(projectData, operation) {
    var sep = ", ";
    // show new item in test field
    var debugDisplay = document.getElementById("proj_debugDisplay");
    debugDisplay.innerHTML = "<b>Operation:</b> " + operation + sep;
    debugDisplay.innerHTML += "<b>Project Name:</b> " + projectData.projectName + sep;
    debugDisplay.innerHTML += "<b>Project Id:</b> " + projectData.projectId + sep;
    debugDisplay.innerHTML += "<b>Tracking Id:</b> " + getProjectDataTagIdentifer(projectData);
    debugDisplay.innerHTML += "<br>";
}

function debug_displayProjectListJson() {
    var list = retrieveProjectList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("proj_debugDisplayJson");
    debugDisplay.innerHTML = "<b>Project List as JSON:</b>" + "<br>" + jsonList;
}

function proj_performLoadOperations() {
    // get current category list
    var projectDataList = retrieveProjectList();

    // remove any previous rows sitting there (yay static nodes...?)
    removeRowsByClass("tt_proj_row");

    // add them to the table
    for (var i = 0; i < projectDataList.length; i++) {
        createProjectDisplayRow(projectDataList[i]);
    }
}

// If the projectId is blank or null, we will use
// the projectName instead
function ensureValidProjectId(projectName, projectId) {
    if (projectId === "" || projectId == null) {
        return projectName;
    }
    return projectId;
}

function onButtonClick_proj_addNewProject() {
    var projectName = document.getElementById("proj_newProjectName").value;
    var checkProjectId = document.getElementById("proj_newProjectId").value;
    var projectId = ensureValidProjectId(projectName, checkProjectId);

    resetAddProjectControls();

    if (projectName === "") {
        alert("Project Name cannot be blank");
        document.getElementById("proj_newProjectName").focus();
        return;
    }

    var projectData = new ProjectData(projectName, projectId);
    debug_displayCurrentProgramItem(projectData, "Add");

    addProjectDataToProjectList(projectData);

}

function addProjectDataToProjectList(projectData) {
    var projectList = retrieveProjectList();
    if (projectList == null) {
        projectList = new Array();
    }

    projectList.push(projectData);
    storeProjectList(projectList);

    createProjectDisplayRow(projectData);

    debug_displayProjectListJson();
}

// "id" tag based on concat of str1+str2
function getProjectDataTagIdentifer(projectData) {
    if (typeof projectData.projectName != "string" || typeof projectData.projectId != "string") {
        console.error("One of these isn't a string: ", projectData.projectName, projectData.projectId);
    }

    return projectData.projectName + projectData.projectId;
}

function createProjectDisplayRow(projectData) {
    var row = document.createElement("div");
    row.className = "w3-row tt_proj_row";
    row.id = getProjectDataTagIdentifer(projectData);

    var col = createProjectDisplayColumn(projectData.projectName);
    row.appendChild(col);

    col = createProjectDisplayColumn(projectData.projectId);
    row.appendChild(col);

    col = createProjectDisplayRemoveButton(projectData, row.id);
    row.appendChild(col);

    document.getElementById("proj_projectDisplayArea").appendChild(row);
}

// return: "div" element as a column for w3
function createProjectDisplayColumn(displayString) {
    var col = document.createElement("div");
    col.className = "w3-col m3 w3-left";

    if (displayString === "" || displayString == null) {
        displayString = "xxx";
    }
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createProjectDisplayRemoveButton(projectData, rowId) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    var button = document.createElement("button");
    var tagId = getProjectDataTagIdentifer(projectData);
    button.id = "button_proj_" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function () {
        console.log("onButtonClick_proj_OnRemoveRow");
        onButtonClick_proj_OnRemoveRow(rowId);
    });

    col.appendChild(button);

    return col;
}

function onButtonClick_proj_OnRemoveRow(rowId) {
    // Remove the row in the html page
    document.getElementById(rowId).remove();

    var projectList = retrieveProjectList();
    var removedProjectData = null;
    // Now remove the item from the project list array
    for (var i = 0; i < projectList.length; i++) {
        if (getProjectDataTagIdentifer(projectList[i]) == rowId) {
            var removedProjectList = projectList.splice(i, 1);
            removedProjectData = removedProjectList[0];
            // breaking out here...will ensure no duplicates elsewhere
            break;
        }
    }

    if (removedProjectData == null) {
        console.error("No project item removed for: ", rowId);
    } else {
        debug_displayCurrentProgramItem(removedProjectData, "Remove");
    }

    // Having removed an item, store current projectList
    storeProjectList(projectList);

    // DEBUGGING
    debug_displayProjectListJson();
}
