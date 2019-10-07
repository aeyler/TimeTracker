"use strict";

var USETESTDATA = true;

function debug_displayTimeDataListJson() {
    var list = retrieveTimeDataList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("time_debugDisplayTimeDataJson");
    debugDisplay.innerHTML = "<b>TimeData List as JSON:</b>" + "<br>" + jsonList;
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

function onButtonClick_StartProject() {
    var projectButton = document.getElementById("time_selectProjectButton");
    var projectData = new ProjectData(projectButton.textContent, projectButton.value);
    var categoryButton = document.getElementById("time_selectCategoryButton");
    var categoryData = new CategoryData(categoryButton.textContent, categoryButton.value);
    if (projectData.projectId == "unset" ||
        categoryData.categoryId == "unset") {
            alert("You must select both a project and a category prior to the start of time tracking");
            return;
        }
    var description = document.getElementById("time_projectDescription").value;
    var startTimeEpoch = Date.now();

    console.log(startTimeEpoch);
    var timeData = new TimeData(projectData, categoryData, description, startTimeEpoch);
    addTimeDataToTimeDataList(timeData);
}

function addTimeDataToTimeDataList(timeData) {
    var timeDataList = retrieveTimeDataList(USETESTDATA);
    if (timeDataList == null) {
        timeDataList = new Array();
    }

    timeDataList.push(timeData);
    storeTimeDataList(timeDataList);

    //createProjectDisplayRow(projectData);

    debug_displayTimeDataListJson();
}

