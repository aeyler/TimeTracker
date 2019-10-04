"use strict";

// **shudder** Global Variables!
var projectList = [];
var projectData = {
    projectName: "",
    projectId: 0
};

function onAddNewProject() {
    var projectName = document.getElementById("newProjectName").value;
    var projectId = document.getElementById("newProjectId").value;

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