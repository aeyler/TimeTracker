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

function equalTimeEntryProjects(te1, te2) {
    var equalProjects = equalProjects(te1.projectData, te2.projectData);
    var equalCategories = equalCategories(te1.categoryData, te2.categoryData);
    return equalProjects && equalCategories;
}

function isProjectNone(projectData) {
    return projectData.projectId === g_noneEntry;
}