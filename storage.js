"use strict";

var testProjectList = '[{"projectName":"test proj 1","projectId":"11111"},{"projectName":"test project 22","projectId":"22222"},{"projectName":"test project 333","projectId":"33333"}]';
var testCategoryList = '[{"category":"test cat 1","categoryId":"test cat 1"},{"category":"test cat 22","categoryId":"test cat 22"}]';

function debug_clearLocalStorage() {
    localStorage.clear();
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
        jsonList = testProjectList;
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
        jsonList = testCategoryList;
    }
    var categoryList = JSON.parse(jsonList);
    return categoryList;
}