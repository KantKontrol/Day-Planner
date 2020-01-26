

//sets current day to html page
$("#currentDay").html(moment().format("MMM Do YYYY"));

loadTimeBlocks();

$(document).on("click", ".lock", function(){
    
    let timeBlocks = $(".time-block").toArray();

    let saveBlock;

    for(let i = 0;i < timeBlocks.length;i++){

        let testTime = $(timeBlocks[i]).attr("time");
        let saveBtnTime = $(this).parent().attr("time");

        console.log({testTime, saveBtnTime});

        if(testTime == saveBtnTime){ //finds corresponding time block and exits loop
            saveBlock = timeBlocks[i]
            break;
        }
    }

    
});

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

        let timePassingIn = times[i];

        newRow.append($("<div>").attr("class", "col-sm-1").append(makeDiv("time-box", timePassingIn, "row hour")));
        newRow.append($("<div>").attr("class", "col-sm-10").append(makeDiv("time-block", timePassingIn, "row time-block")));
        newRow.append($("<div>").attr("class", "col-sm-1").append(makeDiv("save-btn", timePassingIn, "saveBtn row")));
    }
    
}

function makeDiv(type, time, classes){ //make a functon to make all the elements interchanably with input, elimnating 2 methods 

    let newDiv = $("<div>");

    newDiv.attr("class", classes); //sets classes passed in to class attribute
    newDiv.attr("time", time.t); //sets time attribute to elements 24h time repersentation

    if(type == "time-box"){
        newDiv.text(time.d);
    }

    if(type == "time-block"){//sets time attribute and gives time-block text area, also sets past,present, or future
        
        let newTextArea = $("<textarea>");
        newTextArea.attr("class", "textarea");
        newDiv.append(newTextArea);

        setTimeBlockState(newDiv);
    }

    if(type == "save-btn"){
    
        let newLockImg = $("<a>").attr("class", "lock");
        newDiv.append(newLockImg);
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