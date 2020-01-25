

//sets current day to html page
$("#currentDay").html(moment().format("MMM Do YYYY"));



loadTimeBlocks();

function loadTimeBlocks(){

    let times = ["9am", "10am","11am","12pm","1pm","2pm","3pm","4pm"];

    for(let i = 0;i < times.length;i++){

        let newRow = $("<div>");
        newRow.attr("id", i);
        newRow.attr("class", "row");

        $("#timeblocks").append(newRow);

        newRow.append($("<div>").attr("class", "col-sm-1").append(createTimeBox(i, times[i])));
        newRow.append($("<div>").attr("class", "col-sm-10").append(createTimeBlock(i)));
        newRow.append($("<div>").attr("class", "col-sm-1").append(createSaveButton(i)));

    }
}

function createTimeBox(rowId, time){
    let newTimeBox = $("<div>"); //add time box

    newTimeBox.attr("time", time);
    newTimeBox.attr("class", "row hour");

    newTimeBox.text(time);

   return newTimeBox;
}

function createTimeBlock(rowId){

    let newTimeBlock = $("<div>");
    newTimeBlock.attr("class", "time-block row past");

    let newTextArea = $("<textarea>");
    newTextArea.attr("class", "textarea");

    newTimeBlock.append(newTextArea);

   return newTimeBlock;
}

function createSaveButton(rowId){

    let newSaveButton = $("<div>");
    newSaveButton.attr("class", "saveBtn row");

    return newSaveButton;
}