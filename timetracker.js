"use strict";

function tt_performLoadOperations () {
    console.error("TODO: tt_performLoadOperations not implemented.");
}

function tt_selectView(viewSelection) {
    if (typeof viewSelection != "string") {
        console.error ("tt_selectView: input parameter 'view' is not a string: ", viewSelection);
    }

    // hide all the views...
    var views = document.getElementsByClassName("js_view");
    for (var i = 0; i < views.length; i++) {
        views[i].style.display = "none";
    }
    // then display the one the user requested
    document.getElementById(viewSelection).style.display = "block";

    // And this little tidbit will call the function name you've created.
    // WARNING: You change names coming in for viewSelection, you'll break this call.
    var fnName = "display_" + viewSelection;
    if (window[fnName] == null) {
        // bad function name
        console.error("Requested function call does not exist: ", fnName);
        alert("Check the console for an error");
        return;
    }
    window[fnName]();
}


function display_tt_timeEntryTab() {
    time_performLoadOperations();
}

function display_tt_reportTab() {
    report_performLoadOperations();
}

function display_tt_manageProjectsTab() {
    proj_performLoadOperations();
}

function display_tt_manageCategoriesTab() {
    cat_performLoadOperations();
}

function display_tt_testDataTab() {
    // no-op
}