"use strict";

// Input: ProgramList of data
// Return: ProgramList as JSON string
function storeProjectList(list) {
    var jsonList = JSON.stringify(list);
    localStorage.setItem("projectList", jsonList);
    return jsonList;
}

// Return: ProgramList data from localStorage
function retrieveProjectList() {
    var jsonList = localStorage.getItem("projectList");
    var list = JSON.parse(jsonList);
    return list;
}