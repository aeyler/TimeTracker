"use strict";

// Return: list as JSON string
function storeProjectList(list) {
    var jsonList = JSON.stringify(list);
    localStorage.setItem("projectList", jsonList);
    return jsonList;
}

// Return: ProgramList data
function retrieveProjectList() {
    var jsonList = localStorage.getItem("projectList");
    var list = JSON.parse(jsonList);
    return list;
}