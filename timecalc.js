"use strict";

var USETESTDATA = true;

function performLoadOperations() {
    var timeEntryList = retrieveTimeEntryList(USETESTDATA);

    var today = new Date();
    var todayList = getTimeEntryListFor(today);
    displayTodayTimeEntry(todayList);

    calculateWeekTimeEntries(today);
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
function getTimeEntryListFor(someDate) {
    var timeEntryList = retrieveTimeEntryList(USETESTDATA);
    var someDateList = new Array();

    for (var i = 0; i < timeEntryList.length; i++) {
        var testDate = new Date(timeEntryList[i].startTimeDateString);
        if (datesEqual(testDate, someDate)) {
            someDateList.push(timeEntryList[i]);
        }
    }
    return someDateList;
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
x Get list of time entries for each day
x For each day, total up hours on a per project & category basis
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
            matchingTimeEntryList.push(timeEntryList[i]);
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
    var timeEntryDate1 = new Date(timeEntry1.startTimeDateString);
    var timeEntryDate2 = new Date(timeEntry2.startTimeDateString);
    var epoch1 = timeEntryDate1.getTime();
    var epoch2 = timeEntryDate2.getTime();
    return Math.abs(epoch2 - epoch1);
}

// Given a time entry list, total up the various values
// Exp: TimeEntry array
// Return: ProjectTimeDayEntry array
function totalUpTimeEntryList(timeEntryList)
{
    var projectTimeTotalList = new Array();

    for (var i = 0; i < timeEntryList.length; i++) {
        var beginTimeEntry = timeEntryList[i];
        console.log(beginTimeEntry);
        if (isProjectNone(beginTimeEntry.projectData)) {
            // do not calculate "none" entries
            continue;
        }

        var nextTimeEntry = timeEntryList[i+1];
        if (typeof nextTimeEntry == "undefined") {
            // assign new date for midnight(ish) for final calc
            nextTimeEntry = new Date(timeEntry.getFullYear(), timeEntry.getMonth(), timeEntry.getDate(), 23, 59, 59, 999);
        }

        var timeDiffEpoch = timeDiff(beginTimeEntry, nextTimeEntry);

        // If this time entry is already in our list, add it on.
        // Otherwise, push it in.
        var found = false;
        for (var projCnt = 0; projCnt < projectTimeTotalList.length; projCnt++) {
            if (equalProjects(beginTimeEntry.projectData, projectTimeTotalList[projCnt].projectData) &&
                equalCategories(beginTimeEntry.categoryData, projectTimeTotalList[projCnt].categoryData)) {
                    projectTimeTotalList[projCnt].totalTime += timeDiffEpoch;
                    found = true;
                    break;
                }
        }
        if (!found) {
            projectTimeTotalList.push(new ProjectTimeDayEntry(beginTimeEntry.projectData, beginTimeEntry.categoryData, timeDiffEpoch));
        }
    }
    
    return projectTimeTotalList;
}

// Given a date, find and calculate the weekly time entries for that date
function calculateWeekTimeEntries(someDate) {
    var entireTimeEntryList = retrieveTimeEntryList(USETESTDATA);
    var weekDateArray = getGenericWeekDatesFromDate(someDate);
    // dev note: I'm going to use "for" here, but in the future, it would be nice to 
    //           try using "foreach" and anonymous functions.
    for (var i = 0; i < weekDateArray.length; i++) {
        var weekDateTimeEntryList = getMatchingTimeEntryList(entireTimeEntryList, weekDateArray[i]);
        console.log(i, weekDateTimeEntryList);
        var weekDateProjectTimeTotalList = totalUpTimeEntryList(weekDateTimeEntryList);
    }
}