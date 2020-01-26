

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

        newRow.append($("<div>").attr("class", "col-sm-1").append(makeDiv("time-box", times[i], "row hour")));
        newRow.append($("<div>").attr("class", "col-sm-10").append(makeDiv("time-block", times[i], "row time-block")));
        newRow.append($("<div>").attr("class", "col-sm-1").append(makeDiv("save-btn", times[i], "saveBtn row")));
    }
    
}

function makeDiv(type, time, classes){ //make a functon to make all the elements interchanably with input, elimnating 2 methods 

    let newDiv = $("<div>");

    newDiv.attr("class", classes); //sets classes passed in to class attribute

    if(type == "time-box"){
        newDiv.text(time.d);
    }

    if(type == "time-block"){//sets time attribute and gives time-block text area, also sets past,present, or future
        newDiv.attr("time", time.t);
        
        let newTextArea = $("<textarea>");
        newTextArea.attr("class", "textarea");
        newDiv.append(newTextArea);

        setTimeBlockState(newDiv);
    }
    return newDiv;
}

function setTimeBlockState(tBlock){

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