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
}