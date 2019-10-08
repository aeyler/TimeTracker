"use strict";

var USETESTDATA = true;

function performLoadOperations() {
    var timeEntryList = retrieveTimeEntryList(USETESTDATA);

    var todayList = getTimeEntryListForToday();
    displayTodayTimeEntry(todayList);
}

// Exp: timeEntry1 & timeEntry2 are Date()
function datesEqual(timeEntry1, timeEntry2) {
    var validator = new Date();
    if (typeof timeEntry1 != typeof validator || typeof timeEntry2 != typeof validator) {
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

/*
WEEKLY TIME ENTRIES DISPLAY
- All time entries
x Get range of dates we're looking for
xx For given day, find "monday" and go till "sunday"
- Get list of time entries for each day
- For each day, total up hours on a per project & category basis
- Create "week time entry" 
- Display each week time entry in table
*/

// Given a set of time entries, return list of those that match a given day
// Exp: Array of TimeEntry, Date
// Return: TimeEntry array
function getMatchingTimeEntryList(timeEntryList, matchingDate) {
    var matchingTimeEntryList = new Array();
    for (var i = 0; i < timeEntryList.length; i++) {
        var testDate = new Date(timeEntryList[i].startTimeDateString);
        if (datesEqual(testDate, matchingDate)) {
            matchingTimeEntryList.push(testDate);
        }
    }
    return matchingTimeEntryList;
}

// Given a date, get array of dates that match the week
// Return: Date array
function getGenericWeekDatesFromDate(baseDate) {
    var pivotDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    var dayOfWeek = pivotDate.getDay();
    var mondayShiftDays = dayOfWeek - 1; // Monday day is 1. Sunday is 0;
    var mondayDateEpoch = pivotDate.getTime() - (mondayShiftDays * g_24Hrs);

    var weekDateArray = new Array();
    for (var i = 0; i < 7; i++) {
        var weekDayEpoch = mondayDateEpoch + (i * g_24Hrs);
        var weekDay = new Date(weekDayEpoch);
        weekDateArray.push(weekDay);
    }
    return weekDateArray;
}

// Return: time difference in milliseconds
function timeDiff(timeEntry1, timeEntry2) {
    var epoch1 = timeEntry1.getTime();
    var epoch2 = timeEntry2.getTime();
    return Math.abs(epoch2-epoch1);
}

// Given a time entry list, total up the various values
// Exp: TimeEntry array
// Return: ProjectTimeTotal array
function totalUpTimeEntryList(timeEntryList)
{
    projectTimeTotalList = new Array();
    var beginTime;
    var nextTime;
    for (var i = 0; i < timeEntryList.length; i++) {
        var timeEntry = timeEntryList[i];
    }
}

// Given a date, find and calculate the weekly time entries for that date
function calculateWeekTimeEntries(someDate) {
    var entireTimeEntryList = retrieveTimeEntryList(USETESTDATA);
    var weekDateArray = getGenericWeekDatesFromDate(someDate);
    // dev note: I'm going to use "for" here, but in the future, it would be nice to 
    //           try using "foreach" and anonymous functions.
    for (var i = 0; i < weekDateArray.length; i++) {
        var weekDateTimeEntryList = getMatchingTimeEntryList(entireTimeEntryList, weekDateArray[i]);
        var weekDateProjectTimeTotalList = totalUpTimeEntryList(weekDateTimeEntryList);
    }
}