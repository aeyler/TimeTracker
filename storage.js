"use strict";

var test_ProjectList = '[{"projectName":"test proj 1","projectId":"11111"},{"projectName":"test project 22","projectId":"22222"},{"projectName":"test project 333","projectId":"33333"},{"projectName":"<none>","projectId":"<none>"}]';
var test_CategoryList = '[{"categoryName":"test cat 1","categoryId":"test cat 1"},{"categoryName":"test cat 22","categoryId":"test cat 22"},{"categoryName":"<none>","categoryId":"<none>"}]';
var test_TimeEntryList = '[{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"asdf","startTimeDateString":"Mon Oct 08 2019 08:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"","startTimeDateString":"Mon Oct 08 2019 10:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 22","projectId":"22222"},"categoryData":{"categoryName":"test cat 22","categoryId":"test cat 22"},"description":"","startTimeDateString":"Mon Oct 08 2019 11:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"<none>","projectId":"<none>"},"categoryData":{"categoryName":"<none>","categoryId":"<none>"},"description":"out to launch :)","startTimeDateString":"Mon Oct 08 2019 11:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 333","projectId":"33333"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"Back to cat 1, huh?","startTimeDateString":"Mon Oct 08 2019 13:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"late in the day thing...","startTimeDateString":"Mon Oct 08 2019 16:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"<none>","projectId":"<none>"},"categoryData":{"categoryName":"<none>","categoryId":"<none>"},"description":"done for the day","startTimeDateString":"Mon Oct 08 2019 17:30:00 GMT-0500 (Central Daylight Time)"}]';

function debug_clearLocalStorage() {
    localStorage.clear();
}

var g_24Hrs = 86400000; // in milliseconds

// Constructor
function ProjectData(projectName, projectId) {
    this.projectName = projectName;
    this.projectId = projectId;
};

// Constructor
function CategoryData (categoryName) {
    this.categoryName = categoryName;
    this.categoryId = categoryName;
};

// Constructor
function TimeEntry (projectData, categoryData, description, startTime) {
    this.projectData = projectData;
    this.categoryData = categoryData;
    this.description = description;
    this.startTimeDateString = startTime.toString();
}

// Constructor
// Exp: totalTime is in milliseconds
function ProjectTimeDayEntry (projectData, categoryData, totalTime) {
    this.projectData = projectData;
    this.categoryData = categoryData;
    this.totalTime = totalTime;
}

// Constructor
function ProjectTimeWeekEntry (projectData, categoryData) {
    this.projectData = projectData;
    this.categoryData = categoryData;
    this.monTime = 0;
    this.tueTime = 0;
    this.wedTime = 0;
    this.thuTime = 0;
    this.friTime = 0;
    this.satTime = 0;
    this.sunTime = 0;
}

// Input: ProgramList of data
// Return: ProgramList as JSON string
function storeProjectList(programList) {
    var jsonList = JSON.stringify(programList);
    localStorage.setItem("projectList", jsonList);
    return jsonList;
}

// Return: ProgramList data from localStorage
function retrieveProjectList(requestTestData) {
    var jsonList = localStorage.getItem("projectList");
    if (requestTestData === true) {
        jsonList = test_ProjectList;
    }
    var programList = JSON.parse(jsonList);
    return programList;
}

// Input: CategoryList of data
// Return: CategoryList as JSON string
function storeCategoryList(categoryList) {
    var jsonList = JSON.stringify(categoryList);
    localStorage.setItem("categoryList", jsonList);
    return jsonList;
}

// Return: CategoryList data from localStorage
function retrieveCategoryList(requestTestData) {
    var jsonList = localStorage.getItem("categoryList");
    if (requestTestData === true) {
        jsonList = test_CategoryList;
    }
    var categoryList = JSON.parse(jsonList);
    return categoryList;
}

// Input: TimeEntryList of data
// Return: TimeEntryList as JSON string
function storeTimeEntryList(timeEntryList) {
    var jsonList = JSON.stringify(timeEntryList);
    localStorage.setItem("timeEntryList", jsonList);
    return jsonList;
}

// Return: TimeEntryList data from localStorage
function retrieveTimeEntryList(requestTestData) {
    var jsonList = localStorage.getItem("timeEntryList");
    if (requestTestData === true) {
        jsonList = test_TimeEntryList;
    }
    var programList = JSON.parse(jsonList);
    return programList;
}

