"use strict";

function resetAddCategoryControls() {
    // reset form items to their origianl placeholder values
    document.getElementById("cat_newCategory").value = "";
}

function debug_displayCurrentCategoryItem(categoryData, operation) {
    var sep = ", ";
    // show new item in test field
    var debugDisplay = document.getElementById("cat_debugDisplay");
    debugDisplay.innerHTML = "<b>Operation:</b> " + operation + sep;
    debugDisplay.innerHTML += "<b>Category:</b> " + categoryData.categoryName + sep;
    debugDisplay.innerHTML += "<b>Category Id:</b> " + categoryData.categoryId + sep;
    debugDisplay.innerHTML += "<b>Tracking Id:</b> " + getCategoryDataTagIdentifer(categoryData);
    debugDisplay.innerHTML += "<br>";
}

function debug_displayCategoryListJson() {
    var list = retrieveCategoryList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("cat_debugDisplayJson");
    debugDisplay.innerHTML = "<b>Category List as JSON:</b>" + "<br>" + jsonList;
}

function cat_performLoadOperations() {
    // get current category list
    var categoryDataList = retrieveCategoryList();

    // remove any previous rows sitting there (yay static nodes...?)
    removeRowsByClass("tt_cat_row");
    
    // add them to the table
    for (var i = 0; i < categoryDataList.length; i++) {
        createCategoryDisplayRow(categoryDataList[i]);
    }
}

function onButtonClick_cat_addNewCategory() {
    var categoryName = document.getElementById("cat_newCategory").value;

    // reset new category control to default blank value
    resetAddCategoryControls();

    if (categoryName === "") {
        alert("Category cannot be blank");
        document.getElementById("cat_newCategory").focus();
        return;
    }

    var categoryData = new CategoryData(categoryName);
    debug_displayCurrentCategoryItem(categoryData, "Add");

    addCategoryDataToCategoryList(categoryData);
}

function addCategoryDataToCategoryList(categoryData) {
    // Retrieve current categories
    var categoryList = retrieveCategoryList();
    if (categoryList == null) {
        categoryList = new Array();
    }

    // Add and store categories
    categoryList.push(categoryData);
    storeCategoryList(categoryList);

    // DEBUGGING
    debug_displayCategoryListJson();

    createCategoryDisplayRow(categoryData);
}

function createCategoryDisplayRow(categoryData) {
    var row = document.createElement("div");
    row.className = "w3-row tt_cat_row";
    row.id = getCategoryDataTagIdentifer(categoryData);

    var col = createCategoryDisplayColumn(categoryData.categoryName);
    row.appendChild(col);

    col = createCategoryDisplayRemoveButton(categoryData, row.id);
    row.appendChild(col);

    document.getElementById("cat_categoryDisplayArea").appendChild(row);
}

// return: "div" element as a column for w3
function createCategoryDisplayColumn(displayItem) {
    var col = document.createElement("div");
    col.className = "w3-col m3 w3-left";

    if (displayItem === "" || displayItem == null) {
        displayItem = "xxx";
    }
    var node = document.createTextNode(displayItem);
    col.appendChild(node);

    return col;
}

// "id" tag based on category data id
function getCategoryDataTagIdentifer(categoryData) {
    if (typeof categoryData.categoryId != "string") {
        console.error("Category data project id isn't a string: ", categoryData.categoryId);
    }

    return categoryData.categoryId;
}

function createCategoryDisplayRemoveButton(categoryData, rowId) {
    var col = document.createElement("div");
    col.className = "w3-col m1 w3-left";

    var button = document.createElement("button");
    var tagId = rowId;
    button.id = "button_cat_" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function() {
        console.log("onButtonClick_cat_OnRemoveRow");
        onButtonClick_cat_OnRemoveRow(tagId);
    });
    
    col.appendChild(button);

    return col;
}

function onButtonClick_cat_OnRemoveRow(rowId) {
    // Remove the row in the html page
    document.getElementById(rowId).remove();
    
    var categoryList = retrieveCategoryList();
    var removedCategoryData = null;
    // Now remove the item from the category list array
    for (var i = 0; i < categoryList.length; i++) {
        console.log("rowId: ", rowId);
        if (getCategoryDataTagIdentifer(categoryList[i]) == rowId) {
                var retList = categoryList.splice(i, 1);
                removedCategoryData = retList[0];
                // breaking out here...will ensure no duplicates elsewhere
                break;
            }        
    }

    if (removedCategoryData == null) {
        console.error("No category item removed for: ", rowId);
    } else {
        debug_displayCurrentCategoryItem(removedCategoryData, "Remove");
    }

    // Having removed an item, store current categoryList
    storeCategoryList(categoryList);

    // DEBUGGING
    debug_displayCategoryListJson();
}
