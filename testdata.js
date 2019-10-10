"use strict";

function testdata_performLoadOperations() {

}

function onButtonClick_testdata_clearLocalStorage() {
    console.log("Clearning all local storage");
    be_careful_clearLocalStorage();
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = "<i>Nothing, you just cleared it...</i>";
}

function onButtonClick_testdata_insertTestProjectData() {
    console.log("Inserting test project data");
    storeProjectListJsonString(test_ProjectListAsJsonString);
    var debugDisplayString = "<b>Project List</b><br>";
    debugDisplayString += test_ProjectListAsJsonString;
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = debugDisplayString;
}

function onButtonClick_testdata_insertTestCategoryData() {
    console.log("Inserting test category data");
    storeCategoryListJsonString(test_CategoryListAsJsonString);
    var debugDisplayString = "<b>Category List</b><br>";
    debugDisplayString += test_CategoryListAsJsonString;
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = debugDisplayString;
}

function onButtonClick_testdata_insertTestTimeEntryData() {
    console.log("Inserting test time entry data");
    storeTimeEntryListJsonString(test_TimeEntryListAsJsonString);
    var debugDisplayString = "<b>Time Entry List</b><br>";
    debugDisplayString += test_TimeEntryListAsJsonString;
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = debugDisplayString;
}

function onButtonClick_testdata_gimmeNITestData() {
    be_careful_clearLocalStorage();
    console.log("Inserting NI test data (like projects, categores, and fake time entries...)");
    storeProjectListJsonString(test_NIProjectList);
    storeCategoryListJsonString(test_NICategoryList);
    storeTimeEntryListJsonString(test_NITimeEntryList);
    var debugDisplayString = "<b>Project List</b><br>";
    debugDisplayString += test_NIProjectList;
    debugDisplayString += "<br><b>Category List</b><br>";
    debugDisplayString += test_NICategoryList;
    debugDisplayString += "<br><b>Time Entry List</b><br>";
    debugDisplayString += test_NITimeEntryList;
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = debugDisplayString;
}

function onButtonClick_testData_enableDebugAreas() {
    var debugDisplayAreas = document.getElementsByClassName("tt_debugDisplay");
    for (var i = debugDisplayAreas.length-1; i >= 0; i--) {
        debugDisplayAreas[i].style.display = "block";
    }
}