"use strict";

var USETESTDATA = true;

// Fill out the project and category selections
function performLoadOperations() {
    alert("loading...");
    var projectList = retrieveProjectList(USETESTDATA);
    var categoryList = retrieveCategoryList(USETESTDATA);

    console.log(JSON.stringify(projectList));
    
    document.getElementById("time_debugDisplayProjectJson").textContent = JSON.stringify(projectList);
    document.getElementById("time_debugDisplayCategoryJson").textContent = JSON.stringify(categoryList);
}