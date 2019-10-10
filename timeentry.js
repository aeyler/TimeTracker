"use strict";

function debug_displayCurrentTimeEntryItem(timeEntry, operation) {
    var sep = ", ";
    // show new item in test field
    var debugDisplay = document.getElementById("time_debugDisplay");
    debugDisplay.innerHTML = "<b>Operation:</b> " + operation + sep;
    debugDisplay.innerHTML += "<b>Project Name & Id:</b> " + timeEntry.projectData.projectName + ", " + timeEntry.projectData.projectId + sep;
    debugDisplay.innerHTML += "<b>Start Time:</b> " + timeEntry.dateString + sep;
    debugDisplay.innerHTML += "<br>";
}

function debug_displayProjectList(projectList) {
    document.getElementById("time_debugDisplayProjectJson").textContent = JSON.stringify(projectList);
}

function debug_displayCategoryList(categoryList) {
    document.getElementById("time_debugDisplayCategoryJson").textContent = JSON.stringify(categoryList);
}

function debug_displayTimeEntryListJson() {
    var list = retrieveTimeEntryList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("time_debugDisplayTimeEntryJson");
    debugDisplay.innerHTML = "<b>TimeEntry List as JSON:</b>" + "<br>" + jsonList;
}

function time_performLoadOperations() {
    // Fill out the project and category selections
    var projectList = retrieveProjectList();
    var categoryList = retrieveCategoryList();
    if (!validateListsContainData(projectList, categoryList)) {
        return;
    }

    debug_displayProjectList(projectList);
    debug_displayCategoryList(categoryList);

     // remove any previous project/category selections sitting there (yay static nodes...?)
     removeRowsByClass("tt_time_selection");

    addProjectsToDropdown(projectList);
    addCategoriesToDropdown(categoryList);

    // Fill out current time data entries
    var timeEntryList = retrieveTimeEntryList();
 
     // remove any previous rows sitting there (yay static nodes...?)
    removeRowsByClass("tt_time_row");

    var todayTimeEntryList = getMatchingTimeEntryList(timeEntryList, new Date());
    for (var i = 0; i < todayTimeEntryList.length; i++) {
        createTimeEntryDisplayRow(todayTimeEntryList[i]);
    }
}

function validateListsContainData(projectList, categoryList) {
    if (projectList == null || categoryList == null) {
        var alertMsg = "No Projects or Categories have been created.\n\nPlease go to the Manage Projects and/or Manage Categories tab to add them.";
        alert(alertMsg);
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
    div.className = "w3-bar-item w3-button tt_time_selection"; // denote a button(esque) look/feel
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

function onButtonClick_time_startProject() {
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
    if (description === "" || description == null) {
        description = "<none>";
    }
    var startTime = new Date();

    console.log(startTime.toString());
    var timeEntry = new TimeEntry(projectData, categoryData, description, startTime);
    debug_displayCurrentTimeEntryItem(timeEntry, "Add");

    addTimeEntryToTimeEntryList(timeEntry);
}

function addTimeEntryToTimeEntryList(timeEntry) {
    var timeEntryList = retrieveTimeEntryList();
    if (timeEntryList == null) {
        timeEntryList = new Array();
    }

    timeEntryList.push(timeEntry);
    storeTimeEntryList(timeEntryList);

    createTimeEntryDisplayRow(timeEntry);

    debug_displayTimeEntryListJson();
}

function createTimeEntryDisplayRow(timeEntry) {
    var row = document.createElement("div");
    row.className = "w3-row tt_time_row";

    var startTime = new Date(timeEntry.startTimeDateString);
    row.id = startTime.getTime();

    var col = createTimeEntryDisplayColumn(timeEntry.projectData.projectName);
    row.appendChild(col);

    col = createTimeEntryDisplayColumn(timeEntry.categoryData.categoryId);
    row.appendChild(col);

    col = createTimeEntryDisplayColumn(timeEntry.description);
    row.appendChild(col);

    col = createTimeEntryTimeDisplayColumn(startTime);
    row.appendChild(col);

    col = createProjectDisplayRemoveButton(timeEntry, row.id);
    row.appendChild(col);

    document.getElementById("time_projectDisplayArea").appendChild(row);
}

function createTimeEntryDisplayColumn(displayString) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    if (displayString === "" || displayString == null) {
        displayString = "<none>";
    }
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createTimeEntryTimeDisplayColumn(startTime) {
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

function createProjectDisplayRemoveButton(timeEntry, rowId) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    var button = document.createElement("button");
    var tagId = rowId
    button.id = "button" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function () {
        onButtonClick_time_OnRemoveRow(rowId);
    });

    col.appendChild(button);

    return col;
}

function onButtonClick_time_OnRemoveRow(rowId) {
    if (typeof rowId != "string") {
        console.error("rowId should be a string (a number as a string).");
    }

    // Remove the row in the html page
    document.getElementById(rowId).remove();
    
    var timeEntryList = retrieveTimeEntryList();
    console.log(timeEntryList);
    var removedTimeEntry = null;
    // Now remove the item from the category list array
    for (var i = 0; i < timeEntryList.length; i++) {
        var startTimeDateString = timeEntryList[i].startTimeDateString;
        var startTime = new Date(startTimeDateString);
        var startTimeEpoch = startTime.getTime();
        var startTimeEpochString = startTimeEpoch.toString();
        if (startTimeEpochString === rowId) {
                var retList = timeEntryList.splice(i, 1);
                removedTimeEntry = retList[0];
                // breaking out here...will ensure no duplicates elsewhere
                break;
            }        
    }

    if (removedTimeEntry == null) {
        console.error("No time data item removed for: ", rowId);
    } else {
        debug_displayCurrentTimeEntryItem(removedTimeEntry, "Remove");
    }

    // Having removed an item, store current categoryList
    storeTimeEntryList(timeEntryList);

    // DEBUGGING
    debug_displayTimeEntryListJson();
}
