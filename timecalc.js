"use strict";

var USETESTDATA = true;

function performLoadOperations() {
    var timeDataList = retrieveTimeDataList(USETESTDATA);

    var todayList = getTimeDataListForToday();
    displayTodayTimeData(todayList);
}

function datesEqual(timeData1, timeData2) {
    if (typeof timeData1 != "object" || typeof timeData2 != "object") {
        console.error("Time data invalid", timeData1, timeData2);
    }
    if (timeData1.getFullYear() == timeData2.getFullYear() &&
        timeData1.getMonth() == timeData2.getMonth() &&
        timeData1.getDate() == timeData2.getDate()) {
            return true;
        }
    return false;
}

// Returns time entries from/for today's date
function getTimeDataListForToday() {
    var timeDataList = retrieveTimeDataList(USETESTDATA);
    var today = new Date();
    var todayList = new Array();

    for (var i = 0; i < timeDataList.length; i++) {
        var testDate = new Date(timeDataList[i].startTimeDateString);
        if (datesEqual(testDate, today)) {
            todayList.push(timeDataList[i]);
        }
    }
    return todayList;
}

function displayTodayTimeData(todayList) {
    for (var i = 0; i < todayList.length; i++) {
        createTodayTimeDataDisplayColumn(todayList[i]);
    }

}

function createTodayTimeDataDisplayColumn(timeData) {
    var row = document.createElement("div");
    row.className = "w3-row";

    var startTime = new Date(timeData.startTimeDateString);
    row.id = startTime.getTime();

    var col = createTimeDataDisplayColumn(timeData.projectData.projectName);
    row.appendChild(col);

    col = createTimeDataDisplayColumn(timeData.categoryData.categoryId);
    row.appendChild(col);

    col = createTimeDataDisplayColumn(timeData.description);
    row.appendChild(col);

    col = createTimeDataTimeDisplayColumn(startTime);
    row.appendChild(col);

    document.getElementById("report_projectDisplayArea").appendChild(row);
}

function createTimeDataDisplayColumn(displayString) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    if (displayString === "" || displayString == null) {
        displayString = "<none>";
    }
    var node = document.createTextNode(displayString);
    col.appendChild(node);

    return col;
}

function createTimeDataTimeDisplayColumn(startTime) {
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
