"use strict";

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
function retrieveProjectList() {
    var jsonList = localStorage.getItem("projectList");
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
function retrieveCategoryList() {
    var jsonList = localStorage.getItem("categoryList");
    var categoryList = JSON.parse(jsonList);
    return categoryList;
}