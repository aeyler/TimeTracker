"use strict";

var test_ProjectList = '[{"projectName":"test proj 1","projectId":"11111"},{"projectName":"test project 22","projectId":"22222"},{"projectName":"test project 333","projectId":"33333"},{"projectName":"no proj","projectId":"no proj"}]';
var test_CategoryList = '[{"categoryName":"test cat 1","categoryId":"test cat 1"},{"categoryName":"test cat 22","categoryId":"test cat 22"},{"categoryName":"no cat","categoryId":"no cat"}]';
var test_TimeDataList = '[{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"asdf","startTimeDateString":"Mon Oct 07 2019 08:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"","startTimeDateString":"Mon Oct 07 2019 10:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 22","projectId":"22222"},"categoryData":{"categoryName":"test cat 22","categoryId":"test cat 22"},"description":"","startTimeDateString":"Mon Oct 07 2019 11:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"no proj","projectId":"no proj"},"categoryData":{"categoryName":"no cat","categoryId":"no cat"},"description":"out to launch :)","startTimeDateString":"Mon Oct 07 2019 11:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 333","projectId":"33333"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"Back to cat 1, huh?","startTimeDateString":"Mon Oct 07 2019 13:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"late in the day thing...","startTimeDateString":"Mon Oct 07 2019 16:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"no proj","projectId":"no proj"},"categoryData":{"categoryName":"no cat","categoryId":"no cat"},"description":"done for the day","startTimeDateString":"Mon Oct 07 2019 17:30:00 GMT-0500 (Central Daylight Time)"}]';

function debug_clearLocalStorage() {
    localStorage.clear();
}

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
function TimeData (projectData, categoryData, description, startTime) {
    this.projectData = projectData;
    this.categoryData = categoryData;
    this.description = description;
    this.startTimeDateString = startTime.toString();
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

// Input: TimeDataList of data
// Return: TimeDataList as JSON string
function storeTimeDataList(timeDataList) {
    var jsonList = JSON.stringify(timeDataList);
    localStorage.setItem("timeDataList", jsonList);
    return jsonList;
}

// Return: TimeDataList data from localStorage
function retrieveTimeDataList(requestTestData) {
    var jsonList = localStorage.getItem("timeDataList");
    if (requestTestData === true) {
        jsonList = test_TimeDataList;
    }
    var programList = JSON.parse(jsonList);
    return programList;
}

