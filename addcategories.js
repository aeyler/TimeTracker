"use strict";

// Constructor
function CategoryData (categoryName) {
    this.categoryName = categoryName;
    this.categoryId = categoryName;
};

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
    debugDisplay.innerHTML += "<br>";
}

function debug_displayCategoryListJson() {
    var list = retrieveCategoryList();
    var jsonList = JSON.stringify(list);
    var debugDisplay = document.getElementById("cat_debugDisplayJson");
    debugDisplay.innerHTML = "<b>Category List as JSON:</b>" + "<br>" + jsonList;
}

function onButtonClick_AddNewCategory() {
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
    row.className = "w3-row";
    row.id = categoryData.categoryId;

    var col = createCategoryDisplayColumn(categoryData.categoryName);
    row.appendChild(col);

    col = createCategoryDisplayRemoveButton(categoryData);
    row.appendChild(col);

    document.getElementById("cat_categoryDisplayArea").appendChild(row);
}

// return: "div" element as a column for w3
function createCategoryDisplayColumn(displayItem) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    if (displayItem === "" || displayItem == null) {
        displayItem = "xxx";
    }
    var node = document.createTextNode(displayItem);
    col.appendChild(node);

    return col;
}

// "id" tag = str1
function getTagIdentifer(str1) {
    if (typeof str1 != "string") {
        console.error("str1 isn't a string: ", str1);
    }
    
    return str1;
}

function createCategoryDisplayRemoveButton(categoryData) {
    var col = document.createElement("div");
    col.className = "w3-col m2 w3-left";

    var button = document.createElement("button");
    var tagId = getTagIdentifer(categoryData.categoryId);
    button.id = "button" + tagId;
    button.textContent = "Remove";
    // set up listener for Remove button click
    // anonymous function allows passing calling my function with parameters
    button.addEventListener("click", function() {
        onButtonClick_OnRemoveRow(tagId);
    });
    
    col.appendChild(button);

    return col;
}

function onButtonClick_OnRemoveRow(rowId) {
    // Remove the row in the html page
    document.getElementById(rowId).remove();
    
    var categoryList = retrieveCategoryList();
    var removedCategoryData = null;
    // Now remove the item from the category list array
    for (var i = 0; i < categoryList.length; i++) {
        if (categoryList[i].categoryId == rowId) {
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