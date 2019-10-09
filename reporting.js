"use strict";

function report_performLoadOperations() {
    var timeEntryList = retrieveTimeEntryList();

    var today = new Date();
    var todayList = getTimeEntryListFor(today);
    displayTodayTimeEntry(todayList);

    var displayDivId = "report_weeklyTotalsDisplayArea";
    var removalClassName = "report_weeklyTotalsDisplayArea";
    displayWeekTimeEntriesFor(today, displayDivId, removalClassName);

    // and set the weekly report date to today
    var year = today.getFullYear().toString();
    var month = (today.getMonth() + 1).toString();
    var day = today.getDate().toString();
    if (month.length < 2) { month = "0" + month; }
    if (day.length < 2) { day = "0" + day; }
    var specificDateString = year + "-" + month + "-" + day;
    document.getElementById("report_daySelection").value = specificDateString;

    var displayDivId = "report_weeklyReportDisplayArea";
    var removalClassName = "report_weeklyReportDisplayArea";
    displayWeekTimeEntriesFor(today, displayDivId, removalClassName);
    displayWeeklyDateRangeFor(today);
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
    var timeEntryList = retrieveTimeEntryList();
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

// Exp: date strings in format of: "Mon Oct 07 2019 08:23:00 GMT-0500 (Central Daylight Time)"
// Return: time difference in milliseconds
function timeDiff(startTimeDateString1, startTimeDateString2) {
    var timeEntryDate1 = new Date(startTimeDateString1);
    var timeEntryDate2 = new Date(startTimeDateString2);
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
        console.log("beginTimeEntry -> ", beginTimeEntry);
        if (isProjectNone(beginTimeEntry.projectData)) {
            // do not calculate "none" entries
            continue;
        }

        var nextTimeEntry = timeEntryList[i+1];
        var timeDiffEpoch = NaN;
        if (typeof nextTimeEntry == "undefined") {
            // assign new date for midnight(ish) for final calc
            var tempTime = new Date(beginTimeEntry.startTimeDateString);
            console.log("tempTime -> ", tempTime);
            var endOfDayTime = new Date(tempTime.getFullYear(), tempTime.getMonth(), tempTime.getDate(), 23, 59, 59, 999);
            // HACK: faking a time entry
            timeDiffEpoch = timeDiff(beginTimeEntry.startTimeDateString, endOfDayTime.toString());
            console.log("nextTimeEntry -> ", nextTimeEntry);
        }
        else {
            // we've got a good "next time", so use it
            timeDiffEpoch = timeDiff(beginTimeEntry.startTimeDateString, nextTimeEntry.startTimeDateString);
        }

        console.log("timeDiffEpoch -> ", timeDiffEpoch);

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

// Given a list of project times for a certain day, add them into a weekly list
// Return: weekly List (hopefully updated!)
function accumulateProjectTimeListIntoWeeklyList(dayOfWeek, projectTimeDayEntryList, projectTimeWeekEntryList) {
    if (typeof dayOfWeek != "number") {
        console.error("dayOfWeek is not a 'number': ", dayOfWeek);
    }

    // console.log("---accumulateProjectTimeListIntoWeeklyList---");
    // console.log(dayOfWeek);
    // console.log(projectTimeDayEntryList);
    // console.log(projectTimeWeekEntryList);

    for (var i = 0; i < projectTimeDayEntryList.length; i++) {
        // console.log("--projectTimeDayEntryList iteration: ", i);
        var projectTimeDayEntry = projectTimeDayEntryList[i];
        // console.log("projectTimeDayEntry: ", projectTimeDayEntry);
        // First - is project time entry in the weekly list?
        var found = false;
        for (var k = 0; k < projectTimeWeekEntryList.length; k++) {
            var projectTimeWeekEntry = projectTimeWeekEntryList[k];
            // console.log(projectTimeWeekEntry);
            if (equalProjectsAndCategories(projectTimeDayEntry, projectTimeWeekEntry)) {
                // If so, add the daily time entry value to the weekly time entry (in the correct day)
                projectTimeWeekEntry.dayTimes[dayOfWeek] += projectTimeDayEntry.totalTime;
                found = true;
                break;
            }
        }
        // console.log("found: ", found);
        if (!found) {
            // otherwise, add a new weekly entry
            var projectWeekTimeEntry = new ProjectTimeWeekEntry(projectTimeDayEntry.projectData, projectTimeDayEntry.categoryData);
            projectWeekTimeEntry.dayTimes[dayOfWeek] += projectTimeDayEntry.totalTime;
            projectTimeWeekEntryList.push(projectWeekTimeEntry);
        }
    }
    
    // finally, hopefully, return an updated weekly list
    return projectTimeWeekEntryList;
}

// Given a date, find and calculate the weekly time entries for that date
function calculateWeekTimeEntries(someDate) {
    var entireTimeEntryList = retrieveTimeEntryList();
    var weekDateArray = getGenericWeekDatesFromDate(someDate);
    //var weekDateArray = [new Date(2019,9,7), new Date()];
    
    var projectTimeWeekEntryList = new Array();

    // dev note: I'm going to use "for" here, but in the future, it would be nice to 
    //           try using "foreach" and anonymous functions.
    for (var dayNum = 0; dayNum < weekDateArray.length; dayNum++) {
        var weekDateTimeEntryList = getMatchingTimeEntryList(entireTimeEntryList, weekDateArray[dayNum]);
        var weekDateProjectTimeDayEntryList = totalUpTimeEntryList(weekDateTimeEntryList);
        // console.log(weekDateProjectTimeDayEntryList);
        accumulateProjectTimeListIntoWeeklyList(dayNum, weekDateProjectTimeDayEntryList, projectTimeWeekEntryList);
    }
    // console.log("projectTimeWeekEntryList - Accumulated!", projectTimeWeekEntryList);

    return projectTimeWeekEntryList;
}

function displayWeekTimeEntriesFor(someDate, displayDivId, removalClassName) {
    // get a week's worth of time entries
    var projectTimeWeekEntryList = calculateWeekTimeEntries(someDate);

    // and now go display them!
    for (var i = 0; i < projectTimeWeekEntryList.length; i++) {
        addProjectTimeWeekEntryRowToDisplay(projectTimeWeekEntryList[i], displayDivId, removalClassName);
    }
    
    // another quick hack for no time data available
    var isEmpty = projectTimeWeekEntryList.length == 0;
    return isEmpty;
}

function removeRows(displayDivId, removalClassName) {
    var removalItems = document.getElementsByClassName(removalClassName);
    for (var i = (removalItems.length - 1); i >= 0; i--) {
        removalItems[i].remove();
    }
}

function addProjectTimeWeekEntryRowToDisplay(projectTimeWeekEntry, displayDivId, removalClassName) {
    var row = document.createElement("div");
    row.className = "w3-row" + " " + removalClassName;
    row.id = "row_" + displayDivId;

    var col = createWeeklyTotalDisplayColumnText(projectTimeWeekEntry.projectData.projectName);
    row.appendChild(col);

    col = createWeeklyTotalDisplayColumnText(projectTimeWeekEntry.categoryData.categoryName);
    row.appendChild(col);

    // this has HACK written all over it!!!
    // basically, use a temp ProjectTimeWeekEntry to iterate over the number of columns to make
    for (var i = 0; i < projectTimeWeekEntry.dayTimes.length; i++) {
        col = createWeeklyTotalDisplayColumnNumber(projectTimeWeekEntry.dayTimes[i]);
        row.appendChild(col);
    }

    document.getElementById(displayDivId).appendChild(row);
}

// return: "div" element as a column for row
function createWeeklyTotalDisplayColumnText(displayItem) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    if (displayItem === "" || displayItem == null) {
        displayItem = "xxx";
    }
    var node = document.createTextNode(displayItem);
    col.appendChild(node);

    return col;
}

// return: "div" element as a column for row
function createWeeklyTotalDisplayColumnNumber(timeInMilliseconds) {
    var col = document.createElement("div");
    col.className = "w3-col s1 w3-left";

    if (typeof timeInMilliseconds != "number" || timeInMilliseconds == null) {
        timeInMilliseconds = 356400000; // 99 hours should be noticeable as being incorrect
    }
    var node = document.createTextNode(epochToHours(timeInMilliseconds).toFixed(2));
    col.appendChild(node);

    return col;
}

function onButtonClick_report_DisplayWeeklyDataForSelectedDate() {
    var dateSelector = document.getElementById("report_daySelection");
    var selectorDateValue = dateSelector.value;
    var userChosenDate = new Date(selectorDateValue);

    var displayDivId = "report_weeklyReportDisplayArea";
    var removalClassName = "report_weeklyReportDisplayArea";
    removeRows(displayDivId, removalClassName);
    var isEmpty = displayWeekTimeEntriesFor(userChosenDate, displayDivId, removalClassName);
    displayWeeklyDateRangeFor(userChosenDate, isEmpty);
}

function displayWeeklyDateRangeFor(someDate, isEmpty) {
    var firstDateElement = document.getElementById("report_firstDayOfWeekReport");
    var lastDateElement = document.getElementById("report_lastDayOfWeekReport");

    var weekDateArray = getGenericWeekDatesFromDate(someDate);
    firstDateElement.textContent = weekDateArray[0].toDateString();
    lastDateElement.textContent = weekDateArray[6].toDateString();

    document.getElementById("report_noTimeData").hidden = !isEmpty;
}
