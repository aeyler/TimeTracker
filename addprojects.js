"use strict";

// **shudder** Global Variables!
var projectList = new Array();

// Constructor
function ProjectData (projectName, projectId) {
    this.projectName = projectName;
    this.projectId = projectId;
};

function resetAddProjectControls() {
    // reset form items to their origianl placeholder values
    document.getElementById("newProjectName").value = "";
    document.getElementById("newProjectId").value = "";
}

function debug_displayCurrentItem(name, id, operation) {
    var sep = ", ";
    // show new item in test field
    var debugDisplay = document.getElementById("debugDisplay");
    debugDisplay.innerHTML = "<b>Operation:</b> " + operation + sep;
    debugDisplay.innerHTML += "<b>Project Name:</b> " + name + sep;
    debugDisplay.innerHTML += "<b>Project Id:</b> " + id + sep;
    debugDisplay.innerHTML += "<b>Tracking Id:</b> " + getTagIdentifer(name, id) + "<br>";
}

function debug_displayProjectListJson() {
    var list = retrieveProjectList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("debugDisplayJson");
    debugDisplay.innerHTML = "<b>Project List as JSON:</b>" + "<br>" + jsonList;
}

// If the projectId is blank or null, we will use
// the projectName instead
function ensureValidProjectId (name, id) {
    if (id === "" || id == null) {
        return name;
    }
    return id;
}

function onButtonClick_AddNewProject() {
    var projectName = document.getElementById("newProjectName").value;
    var checkProjectId = document.getElementById("newProjectId").value;
    var projectId = ensureValidProjectId(projectName, checkProjectId);

    resetAddProjectControls();

    if (projectName === "") {
        alert("Project Name cannot be blank");
        document.getElementById("newProjectName").focus();
        return;
    }

    debug_displayCurrentItem(projectName, projectId, "Add");

    addProjectDataToProjectList(projectName, projectId);

    // Having removed an item, store current projectList
    storeProjectList(projectList);
    debug_displayProjectListJson();
}

function addProjectDataToProjectList(name, id) {
    var projectData = new ProjectData(name, id);
    projectList.push(projectData);

    createProjectDisplayRow(name, id);
}

// "id" tag based on concat of str1+str2
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

    if (display === "" || display == null) {
        display = "xxx";
    }
    var node = document.createTextNode(display);
    col.appendChild(node);

    return col;
}

function createProjectDisplayRemoveButton(name, id) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var button = document.createElement("button");
    var tagId = getTagIdentifer(name, id);
    button.id = "button" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function() {
        onButtonClick_OnRemoveRow(name, id);
    });
    
    col.appendChild(button);

    return col;
}

function onButtonClick_OnRemoveRow(name, id) {
    debug_displayCurrentItem(name, id, "Remove");

    // Remove the row in the html page
    document.getElementById(getTagIdentifer(name, id)).remove();
    
    // Now remove the item from the project list array
    for (var i = 0; i < projectList.length; i++) {
        if (projectList[i].projectName == name &&
            projectList[i].projectId == id) {
                projectList.splice(i, 1);
                // breaking out here...will ensure no duplicates elsewhere
                break;
            }        
    }

    // Having removed an item, store current projectList
    storeProjectList(projectList);
    debug_displayProjectListJson();
}