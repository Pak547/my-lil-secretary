// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const input = document.getElementsByName("textarea")
const dateTime = $('#dateTime');

function printDateTime(){
  var date = dayjs().format("dddd, MMMM D YYYY, h:mm:ss a") 
  dateTime.text(date);
};
printDateTime();

// Array for each hour and empty string to input
let eachTime = [
  {
    hour: "9 am",
    event: ""
  },
  {
    hour:"10 am",
    event:""
  },
  {
    hour:"11 am",
    event:""
  },
  {
    hour:"12 pm",
    event:""
  },
  {
    hour:"1 pm",
    event:""
  },
  {
    hour:"2 pm",
    event:""
  },
  {
    hour:"3 pm",
    event:""
  },
  {
    hour:"4 pm",
    event:""
  },
  {
    hour:"5 pm",
    event:""
  },
];
// function to integrate the array and add HTML rows for each hour
eachTime.forEach(function(timeBlock, index) {
  var hourTime = timeBlock.hour;
  var setColor = colorTime(hourTime);
  var block =
    '<div class="time-block" id="' +
    index +
    '"><div class="col-2 col-md-1 hour text-center py-3">' +
    hourTime +
    '</div><textarea class="col-8 col-md-10 description ' +
    setColor +
    '" rows="3">' +
    timeBlock.event +
    '</textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>';

  $(".main").append(block);
});

// dayjs active clock
function printDateTime(){
  var date = dayjs().format("dddd, MMMM D YYYY, h:mm:ss a") 
  dateTime.text(date);
};
printDateTime();

// able to view setitems in local storage by getitem
const TodoList = JSON.parse(localStorage.getItem("ToDo"));
if (TodoList) {
  eachTime = TodoList;
} 
// function to return past present or future, in css it'll change color based on the name
function colorTime(hour) {
    var currentHour = dayjs().format("h a")

    if(currentHour < hour){
      return "future";
    } else if (currentHour > hour){
      return "past";
    } else {
      return "present";
    }
  }

const storedData = JSON.parse(localStorage.getItem("textarea"));
  if (storedData) {
    eachTime = storedData
  }

  // this saves the user input
$(".saveBtn").on("click",function (){
  var timeBlockID = parseInt(
    $(this)
      .closest(".time-block")
      .attr("id")
  );
  var userInput = $.trim(
    $(this)
      .parent()
      .siblings(".description")
      .val()
  );
  eachTime[timeBlockID].event = userInput;
  
  localStorage.setItem("textarea", JSON.stringify(eachTime));
  console.log("saved")
});