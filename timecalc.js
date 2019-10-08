"use strict";

var USETESTDATA = true;

function performLoadOperations() {
    var timeEntryList = retrieveTimeEntryList(USETESTDATA);

    var todayList = getTimeEntryListForToday();
    displayTodayTimeEntry(todayList);
}

function datesEqual(timeEntry1, timeEntry2) {
    if (typeof timeEntry1 != "object" || typeof timeEntry2 != "object") {
        console.error("Time data invalid", timeEntry1, timeEntry2);
    }
    if (timeEntry1.getFullYear() == timeEntry2.getFullYear() &&
        timeEntry1.getMonth() == timeEntry2.getMonth() &&
        timeEntry1.getDate() == timeEntry2.getDate()) {
            return true;
        }
    return false;
}

// Returns time entries from/for today's date
function getTimeEntryListForToday() {
    var timeEntryList = retrieveTimeEntryList(USETESTDATA);
    var today = new Date();
    var todayList = new Array();

    for (var i = 0; i < timeEntryList.length; i++) {
        var testDate = new Date(timeEntryList[i].startTimeDateString);
        if (datesEqual(testDate, today)) {
            todayList.push(timeEntryList[i]);
        }
    }
    return todayList;
}

function displayTodayTimeEntry(todayList) {
    for (var i = 0; i < todayList.length; i++) {
        createTodayTimeEntryDisplayColumn(todayList[i]);
    }

}

function createTodayTimeEntryDisplayColumn(timeEntry) {
    var row = document.createElement("div");
    row.className = "w3-row";

    var startTime = new Date(timeEntry.startTimeDateString);
    row.id = startTime.getTime();

    var col = createTimeEntryDisplayColumn(timeEntry.projectData.projectName);
    row.appendChild(col);

    col = createTimeEntryDisplayColumn(timeEntry.categoryData.categoryId);
    row.appendChild(col);

    col = createTimeEntryDisplayColumn(timeEntry.description);
    row.appendChild(col);

    col = createTimeEntryTimeDisplayColumn(startTime);
    row.appendChild(col);

    document.getElementById("report_dailyTimeEntryDisplayArea").appendChild(row);
}

function createTimeEntryDisplayColumn(displayString) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    if (displayString === "" || displayString == null) {
        displayString = "<none>";
    }
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createTimeEntryTimeDisplayColumn(startTime) {
    if (typeof startTime != "object") {
        console.error("startTime should be a Date object.");
    }
    
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var displayString = startTime.toLocaleTimeString("en-GR", {hourCycle: "h24"});
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}
