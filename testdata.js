"use strict";

var test_ProjectListAsJsonString = '[{"projectName":"test proj 1","projectId":"11111"},{"projectName":"test project 22","projectId":"22222"},{"projectName":"test project 333","projectId":"33333"},{"projectName":"<none>","projectId":"<none>"}]';
var test_CategoryListAsJsonString = '[{"categoryName":"test cat 1","categoryId":"test cat 1"},{"categoryName":"test cat 22","categoryId":"test cat 22"},{"categoryName":"<none>","categoryId":"<none>"}]';
var test_TimeEntryListAsJsonString = '[{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"asdf","startTimeDateString":"Mon Oct 08 2019 08:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"","startTimeDateString":"Mon Oct 08 2019 10:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 22","projectId":"22222"},"categoryData":{"categoryName":"test cat 22","categoryId":"test cat 22"},"description":"","startTimeDateString":"Mon Oct 08 2019 11:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"<none>","projectId":"<none>"},"categoryData":{"categoryName":"<none>","categoryId":"<none>"},"description":"out to launch :)","startTimeDateString":"Mon Oct 08 2019 11:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 333","projectId":"33333"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"Back to cat 1, huh?","startTimeDateString":"Mon Oct 08 2019 13:00:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"test proj 1","projectId":"11111"},"categoryData":{"categoryName":"test cat 1","categoryId":"test cat 1"},"description":"late in the day thing...","startTimeDateString":"Mon Oct 08 2019 16:30:00 GMT-0500 (Central Daylight Time)"},{"projectData":{"projectName":"<none>","projectId":"<none>"},"categoryData":{"categoryName":"<none>","categoryId":"<none>"},"description":"done for the day","startTimeDateString":"Mon Oct 08 2019 17:30:00 GMT-0500 (Central Daylight Time)"}]';


function testdata_performLoadOperations() {

}

function debug_clearLocalStorage() {
    console.log("Clearning all local storage");
    be_careful_clearLocalStorage();
    document.getElementById("test_dataInsertedToLocalStorage").innerHTML = "<i>Nothing, you just cleared it...</i>";
}

function debug_insertTestProjectData() {
    console.log("Inserting test project data");
    storeProjectListJsonString(test_ProjectListAsJsonString);
    document.getElementById("test_dataInsertedToLocalStorage").textContent = test_ProjectListAsJsonString;
}

function debug_insertTestCategoryData() {
    console.log("Inserting test category data");
    storeCategoryListJsonString(test_CategoryListAsJsonString);
    document.getElementById("test_dataInsertedToLocalStorage").textContent = test_CategoryListAsJsonString;
}

function debug_insertTestTimeEntryData() {
    console.log("Inserting test time entry data");
    storeTimeEntryListJsonString(test_TimeEntryListAsJsonString);
    document.getElementById("test_dataInsertedToLocalStorage").textContent = test_TimeEntryListAsJsonString;
}
