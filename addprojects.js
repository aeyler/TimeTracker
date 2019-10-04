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
    var projectNameElem = document.getElementById("newProjectName");
    var projectName = projectNameElem.value;
    var projectIdElem = document.getElementById("newProjectId");
    var projectId = projectIdElem.value;

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
}