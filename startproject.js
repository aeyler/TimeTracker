"use strict";

var USETESTDATA = true;

function TimeData (projectId, categoryId, description, startTime) {
    this.projectId = projectId;
    this.categoryId = categoryId;
    this.description = description;
    this.startTime = startTime;
}

// Fill out the project and category selections
function performLoadOperations() {
    var projectList = retrieveProjectList(USETESTDATA);
    var categoryList = retrieveCategoryList(USETESTDATA);

    console.log(JSON.stringify(projectList));

    document.getElementById("time_debugDisplayProjectJson").textContent = JSON.stringify(projectList);
    document.getElementById("time_debugDisplayCategoryJson").textContent = JSON.stringify(categoryList);

    addProjectsToDropdown(projectList);
    addCategoriesToDropdown(categoryList);
}

// Create dropdown project selections
function addProjectsToDropdown(projectList) {
    if (projectList == null) {
        alert("No Projects Defined");
        return;
    }
    for (var i = 0; i < projectList.length; i++) {
        addProjectDataToDropdown(projectList[i]);
    }
}

// Create dropdown category selections
function addCategoriesToDropdown(categoryList) {
    if (categoryList == null) {
        alert("No Categories Defined");
        return;
    }
    for (var i = 0; i < categoryList.length; i++) {
        addCategoryDataToDropdown(categoryList[i]);
    }
}

function getDivItem(name, id) {
    var div = document.createElement("div");
    div.className = "w3-bar-item w3-button"; // denote a button(esque) look/feel
    div.textContent = name;
    div.setAttribute("value", id);
    return div;
}

function addProjectDataToDropdown(projectData) {
    var div = getDivItem(projectData.projectName, projectData.projectId);

    div.addEventListener("click", function () {
        var button = document.getElementById("time_selectProjectButton");
        button.textContent = projectData.projectName;
        button.setAttribute("value", projectData.projectId);
    });

    var projectDropdown = document.getElementById("time_selectProjectDropdown");
    projectDropdown.appendChild(div);
}

function addCategoryDataToDropdown(categoryData) {
    var div = getDivItem(categoryData.categoryName, categoryData.categoryId);

    div.addEventListener("click", function () {
        var button = document.getElementById("time_selectCategoryButton");
        button.textContent = categoryData.categoryName;
        button.setAttribute("value", categoryData.categoryId);
    });

    var categoryDropdown = document.getElementById("time_selectCategoryDropdown");
    categoryDropdown.appendChild(div);
}