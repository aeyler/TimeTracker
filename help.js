"use strict";

function onIconClick_time_timeEntryHelp() {
    var helpText = "";
    helpText += "To add a new time entry:";
    helpText += "\n\n";
    helpText += "1) Required: Select a project from the [Select Project] hover control.";
    helpText += "\n";
    helpText += "2) Required: Select a category from the [Select Category] hover control.";
    helpText += "\n";
    helpText += "3) Optional: Enter a description in the [Free Text Description] input.";
    helpText += "\n";
    helpText += "4) Click [Begin].";
    helpText += "\n\n";
    helpText += "Known Issue: Clicking on project or category select button will equate to a [Begin] click.";

    alert(helpText);
}

function onIconClick_report_SelectAWeekHelp() {
    var helpText = "";
    helpText += "To request a report for a specific week:";
    helpText += "\n\n";
    helpText += "1) Required: Select a day in the date picker.";
    helpText += "\n";
    helpText += "2) Click [Calculate].";
    helpText += "\n";
    helpText += "A work week will be calculated around the date you select.";
    helpText += "\n";
    helpText += "If no time data is available, that will be indicated";

    alert(helpText);
}

function onIconClick_proj_ManageProjectsHelp() {
    var helpText = "";
    helpText += "To add a project:";
    helpText += "\n\n";
    helpText += "1) Required: Enter a project name in the [Project Name] input.";
    helpText += "\n";
    helpText += "2) Optional: Enter a project id in the [Project Id] input. If you do not, the project name will be used.";
    helpText += "\n";
    helpText += "3) Click [Create].";
    helpText += "\n\n";
    helpText += "Known Issue: Duplicates are allowed and have undefined behavior.";

    alert(helpText);
}

function onIconClick_cat_ManageCategoriesHelp() {
    var helpText = "";
    helpText += "To add a category:";
    helpText += "\n\n";
    helpText += "1) Required: Enter a category name in the [Category] input.";
    helpText += "\n";
    helpText += "2) Click [Create].";
    helpText += "\n\n";
    helpText += "Known Issue: Duplicates are allowed and have undefined behavior.";

    alert(helpText);
}

function onIconClick_testdata_PageHelp() {
    var helpText = "";
    helpText += "User Warning: If you are on this page, hope you know what you are doing...easy to lose all your data.";
    helpText += "\n\n";
    helpText += "Developer Note: Yea...pretty much the same.";

    alert(helpText);
}
