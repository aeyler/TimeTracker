"use strict";

var USETESTDATA = true;

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
    var projectDropdown = document.getElementById("time_selectProjectDropdown");
    for (var i = 0; i < projectList.length; i++) {
        addElementToDropdown(projectDropdown, projectList[i].projectName);
    }
}

// Create dropdown category selections
function addCategoriesToDropdown(categoryList) {
    if (categoryList == null) {
        alert("No Categories Defined");
        return;
    }
    var categoryDropdown = document.getElementById("time_selectCategoryDropdown");
    for (var i = 0; i < categoryList.length; i++) {
        addElementToDropdown(categoryDropdown, categoryList[i].categoryName);
    }
}

function addElementToDropdown(parent, elementSting) {
    var p = document.createElement("div");
    p.className = "w3-bar-item w3-button"; // denote a button(esque) look/feel
    p.textContent = elementSting;
    parent.appendChild(p);
}