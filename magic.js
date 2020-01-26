

//sets current day to html page
$("#currentDay").html(moment().format("MMM Do YYYY"));

var currentToDo = [];

loadTimeBlocks();
loadSavedData();

$(document).on("click", ".lock", function(){
    
    let timeBlocks = $(".time-block").toArray();
    let saveArea;
    let timeId; //used to keep track of data

    for(let i = 0;i < timeBlocks.length;i++){

        let testTime = $(timeBlocks[i]).attr("id");
        let saveBtnTime = $(this).parent().attr("time");

        if(testTime == saveBtnTime){ //finds corresponding time block and exits loop
            saveArea = $(timeBlocks[i]).children(); //stores textarea of corresponding time-block
            timeId = testTime;
            break;
        }
    }

    let userData = $(saveArea).val();
    saveData(timeId, userData);

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

    newDiv.attr("class", classes); //sets classes passed in to class attribut 
    //sets id attribute to elements 24h time repersentation

    if(type == "time-box"){
        newDiv.text(time.d);
    }

    if(type == "time-block"){//sets time attribute and gives time-block text area, also sets past,present, or future
        newDiv.attr("id", time.t);
        let newTextArea = $("<textarea>");
        newTextArea.attr("class", "textarea");
        newDiv.append(newTextArea);

        setTimeBlockState(newDiv);
    }

    if(type == "save-btn"){
        newDiv.attr("time", time.t)
        let newLockImg = $("<a>").attr("class", "lock");
        newDiv.append(newLockImg);
    }
    return newDiv;
}

function setTimeBlockState(tBlock){

        let t = $(tBlock).attr("id");

        let currentTime24 = moment().format("HH");

        if(t == currentTime24){//present

            $(tBlock).attr("class", "time-block row present");

        }else if(t < currentTime24){ //past

            $(tBlock).attr("class", "time-block row past");

        }else if(t > currentTime24){ //future

            $(tBlock).attr("class", "time-block row future");
        
        }
}

function saveData(id, dataToSave){

    let toPush = {
        id: id,
        userData: dataToSave
    }

    let dataStored = false;

    for(let i = 0;i < currentToDo.length;i++){

        if(currentToDo[i].id == id){
            currentToDo[i] = toPush;
            dataStored = true;
        }
    }

    if(!dataStored){
        currentToDo.push(toPush);
    }
   
    window.localStorage.setItem('ToDo', JSON.stringify(currentToDo));
}

function loadSavedData(){
    let incomingData = JSON.parse(window.localStorage.getItem('ToDo'));

    if(incomingData == null){
        currentToDo = [];
    }
    else{
        currentToDo = incomingData;
    }

    for(let i = 0;i < currentToDo.length;i++){

        let search = "#"+currentToDo[i].id;
        let savedText = currentToDo[i].userData;

        $(search).children().val(savedText);
    }
}