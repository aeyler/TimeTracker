"use strict";

var g_noneEntry = "<none>";

// In: ProjectData, ProjectData
// Ret: bool for equality
function equalProjects(proj1, proj2) {
    return proj1.projectName === proj2.projectName &&
            proj1.projectId === proj2.projectId;
}

function equalCategories(cat1, cat2) {
    return cat1.categoryName === cat2.categoryName &&
            cat1.categoryId === cat2.categoryId;
}

// HACK WARNING - this is abusing the non-type safety of JS!
// ...I'm assuming that inputs have projectData and categoryData entries...
function equalProjectsAndCategories(item1, item2) {
    return equalProjects(item1.projectData, item2.projectData) && 
        equalCategories(item1.categoryData, item2.categoryData);
}

function isProjectNone(projectData) {
    return projectData.projectId === g_noneEntry;
}

function epochToHours(milliseconds) {
    if (typeof milliseconds != "number") {
        console.error("epochToHours call requires a number: ", milliseconds);
    }
    return milliseconds / 1000 / 60 / 60;
}