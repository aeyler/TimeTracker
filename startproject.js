"use strict";

var USETESTDATA = true;

function debug_displayCurrentTimeDataItem(timeData, operation) {
    var sep = ", ";
    // show new item in test field
    var debugDisplay = document.getElementById("time_debugDisplay");
    debugDisplay.innerHTML = "<b>Operation:</b> " + operation + sep;
    debugDisplay.innerHTML += "<b>Project Name & Id:</b> " + timeData.projectData.projectName + ", " + timeData.projectData.projectId + sep;
    debugDisplay.innerHTML += "<b>Start Time:</b> " + timeData.dateString + sep;
    debugDisplay.innerHTML += "<br>";
}

function debug_displayProjectList(projectList) {
    document.getElementById("time_debugDisplayProjectJson").textContent = JSON.stringify(projectList);
}

function debug_displayCategoryList(categoryList) {
    document.getElementById("time_debugDisplayCategoryJson").textContent = JSON.stringify(categoryList);
}

function debug_displayTimeDataListJson() {
    var list = retrieveTimeDataList();
    console.log(list);
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("time_debugDisplayTimeDataJson");
    debugDisplay.innerHTML = "<b>TimeData List as JSON:</b>" + "<br>" + jsonList;
}

// Fill out the project and category selections
function performLoadOperations() {
    var projectList = retrieveProjectList(USETESTDATA);
    var categoryList = retrieveCategoryList(USETESTDATA);
    if (!validateListsContainData(projectList, categoryList)) {
        return;
    }

    debug_displayProjectList(projectList);
    debug_displayCategoryList(categoryList);

    addProjectsToDropdown(projectList);
    addCategoriesToDropdown(categoryList);
}

function validateListsContainData(projectList, categoryList) {
    if (projectList == null) {
        alert("No Projects Defined");
        return false;
    }
    if (categoryList == null) {
        alert("No Categories Defined");
        return false;
    }
    return true;
}

// Create dropdown project selections
function addProjectsToDropdown(projectList) {
    for (var i = 0; i < projectList.length; i++) {
        addProjectDataToDropdown(projectList[i]);
    }
}

// Create dropdown category selections
function addCategoriesToDropdown(categoryList) {
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
    var startTime = new Date();

    console.log(startTime.toString());
    var timeData = new TimeData(projectData, categoryData, description, startTime);
    debug_displayCurrentTimeDataItem(timeData, "Add");

    addTimeDataToTimeDataList(timeData);
}

function addTimeDataToTimeDataList(timeData) {
    var timeDataList = retrieveTimeDataList(USETESTDATA);
    if (timeDataList == null) {
        timeDataList = new Array();
    }

    timeDataList.push(timeData);
    storeTimeDataList(timeDataList);

    createTimeDataDisplayRow(timeData);

    debug_displayTimeDataListJson();
}

function createTimeDataDisplayRow(timeData) {
    var row = document.createElement("div");
    row.className = "w3-row";

    var startTime = new Date(timeData.startTimeDateString);
    row.id = startTime.getTime();

    var col = createTimeDataDisplayColumn(timeData.projectData.projectName);
    row.appendChild(col);

    col = createTimeDataDisplayColumn(timeData.categoryData.categoryId);
    row.appendChild(col);

    col = createTimeDataDisplayColumn(timeData.description);
    row.appendChild(col);

    col = createTimeDataTimeDisplayColumn(startTime);
    row.appendChild(col);

    col = createProjectDisplayRemoveButton(timeData, row.id);
    row.appendChild(col);

    document.getElementById("time_projectDisplayArea").appendChild(row);
}

function createTimeDataDisplayColumn(displayString) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    if (displayString == null) {
        displayString = "";
    }
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createTimeDataTimeDisplayColumn(startTime) {
    if (typeof startTime != "object") {
        console.error("startTime should be a Date object.");
    }
    
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var displayString = startTime.toLocaleString("en-GR", {hourCycle: "h24"});
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createProjectDisplayRemoveButton(timeData, rowId) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    var button = document.createElement("button");
    var tagId = rowId
    button.id = "button" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function () {
        onButtonClick_OnRemoveRow(rowId);
    });

    col.appendChild(button);

    return col;
}

function onButtonClick_OnRemoveRow(rowId) {
    if (typeof rowId != "string") {
        console.error("rowId should be a string (a number as a string).");
    }

    // Remove the row in the html page
    document.getElementById(rowId).remove();
    
    var timeDataList = retrieveTimeDataList();
    console.log(timeDataList);
    var removedTimeData = null;
    // Now remove the item from the category list array
    for (var i = 0; i < timeDataList.length; i++) {
        var startTimeDateString = timeDataList[i].startTimeDateString;
        var startTime = new Date(startTimeDateString);
        var startTimeEpoch = startTime.getTime();
        var startTimeEpochString = startTimeEpoch.toString();
        if (startTimeEpochString === rowId) {
                var retList = timeDataList.splice(i, 1);
                removedTimeData = retList[0];
                // breaking out here...will ensure no duplicates elsewhere
                break;
            }        
    }

    if (removedTimeData == null) {
        console.error("No time data item removed for: ", rowId);
    } else {
        debug_displayCurrentTimeDataItem(removedTimeData, "Remove");
    }

    // Having removed an item, store current categoryList
    storeTimeDataList(timeDataList);

    // DEBUGGING
    debug_displayTimeDataListJson();
}