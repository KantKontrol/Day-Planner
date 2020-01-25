

//sets current day to html page
$("#currentDay").html(moment().format("MMM Do YYYY"));



loadTimeBlocks();

function loadTimeBlocks(){

    let times = ["9am", "10am","11am","12pm","1pm","2pm","3pm","4pm"];

    for(let i = 0;i < times.length;i++){

        let newRow = $("<div>");
        newRow.attr("id", i);
        newRow.attr("class", "row");

        let newCol = $("<div>").attr("class", "col-sm-12");

        newRow.append(newCol);

        $("#timeblocks").append(newRow);

        createTimeBox(i, times[i]);
        createTimeBlock(i);
        createSaveButton(i);

    }
}

function createTimeBox(rowId, time){
    let newTimeBox = $("<div>"); //add time box

    newTimeBox.attr("time", time);
    newTimeBox.attr("class", "hour");

    newTimeBox.text(time);

    console.log($("#"+rowId).first());

    $("#"+rowId).children(0).append(newTimeBox);
}

function createTimeBlock(rowId){

    let newTimeBlock = $("<div>");
    newTimeBlock.attr("class", "time-block present");

    let newTextArea = $("<textarea>");
    newTextArea.attr("class", "textarea");

    newTimeBlock.append(newTextArea);

    $("#"+rowId).children(0).append(newTimeBlock);
}

function createSaveButton(rowId){

    let newSaveButton = $("<div>");
    newSaveButton.attr("class", "saveBtn");

    $("#"+rowId).children(0).append(newSaveButton);
}