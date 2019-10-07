"use strict";

var test_ProjectList = '[{"projectName":"test proj 1","projectId":"11111"},{"projectName":"test project 22","projectId":"22222"},{"projectName":"test project 333","projectId":"33333"}]';
var test_CategoryList = '[{"categoryName":"test cat 1","categoryId":"test cat 1"},{"categoryName":"test cat 22","categoryId":"test cat 22"}]';

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
    // if (requestTestData === true) {
    //     jsonList = test_ProjectList;
    // }
    var programList = JSON.parse(jsonList);
    return programList;
}

