

//sets current day to html page
$("#currentDay").html(moment().format("MMM Do YYYY"));

loadTimeBlocks();

function loadTimeBlocks(){

    let times = [
        {d: "9am", t: "09"}, 
        {d: "10am", t: "10"}, 
        {d: "11am", t: "11"}, 
        {d: "12pm", t: "12"}, 
        {d: "1pm", t: "13"},
        {d: "2pm", t: "14"},
        {d: "3pm", t: "15"},
        {d: "4pm", t: "16"},
        {d: "5pm", t: "17"}
    ];

    for(let i = 0;i < times.length;i++){

        let newRow = $("<div>");
        newRow.attr("id", i);
        newRow.attr("class", "row timeRow");

        $("#timeblocks").append(newRow);

        newRow.append($("<div>").attr("class", "col-sm-1").append(createTimeBox(i, times[i])));
        newRow.append($("<div>").attr("class", "col-sm-10").append(createTimeBlock(i, times[i])));
        newRow.append($("<div>").attr("class", "col-sm-1").append(createSaveButton(i)));
    }
    
}

function makeObject(){ //make a functon to make all the elements interchanably with input, elimnating 2 methods 


}

function createTimeBox(rowId, time){
    let newTimeBox = $("<div>"); //add time box

    newTimeBox.attr("class", "row hour");

    newTimeBox.text(time.d);

   return newTimeBox;
}

function createTimeBlock(rowId, time){

    let newTimeBlock = $("<div>");
    newTimeBlock.attr("time", time.t); //stores hour in attribute
    newTimeBlock.attr("class", "time-block row");

    setTimeBlockState(newTimeBlock);

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

function setTimeBlockState(tBlock){}

        let t = $(tBlock).attr("time");

        let currentTime24 = moment().format("HH");

        if(t == currentTime24){//present

            $(tBlock).attr("class", "time-block row present");

        }else if(t < currentTime24){ //past

            $(tBlock).attr("class", "time-block row past");

        }else if(t > currentTime24){ //future

            $(tBlock).attr("class", "time-block row future");
        
        }
}