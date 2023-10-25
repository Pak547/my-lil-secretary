// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const input = document.getElementsByName("textarea")
const dateTime = $('#dateTime');

function printDateTime() {
  var date = dayjs().format("dddd, MMMM D YYYY, h:mm:ss a")
  dateTime.text(date);
};
printDateTime();
// we want eachTime to have an empty value to check previous local storage before all the mumbo jumbo
let eachTime = JSON.parse(localStorage.getItem("ToDo"));
// checking if eachtime returns an empty then we run the array
if(eachTime === undefined){
// Array for each hour and empty string to input
eachTime = [
  {
    hour: 9,
    value: ""
  },
  {
    hour: 10,
    value: ""
  },
  {
    hour: 11,
    value: ""
  },
  {
    hour: 12,
    value: ""
  },
  {
    hour:  13,
    value: ""
  },
  {
    hour: 14,
    value: ""
  },
  {
    hour: 15,
    value: ""
  },
  {
    hour: 16,
    value: ""
  },
  {
    hour: 17,
    value: ""
  },
];
}
// function to integrate the array and add HTML rows for each hour
function updateDOM() {

  eachTime.forEach(function (timeBlock, index) {
    var militaryTime = timeBlock.hour;
    //  because it's time its easier to compare with object and integer
    var timeText = dayjs().hour(militaryTime).format("h a");
    var setColor = colorTime(militaryTime);
    var block =
      '<div class="time-block" id="' +
      index +
      '"><div class="col-2 col-md-1 hour text-center py-3">' +
      timeText +
      '</div><textarea class="col-8 col-md-10 description ' +
      setColor +
      '" rows="3">' +
      timeBlock.value +
      '</textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>';
  
    $(".main").append(block);
  });
}
updateDOM();

// dayjs active clock
function printDateTime() {
  var date = dayjs().format("dddd, MMMM D YYYY, h:mm:ss a")
  dateTime.text(date);
};
printDateTime();


// function to return past present or future, in css it'll change color based on the name
function colorTime(hour) {
  var currentHour = dayjs().hour();
  if (currentHour < hour) {
    return "future";
  } else if (currentHour > hour) {
    return "past";
  } else {
    return "present";
  }
}

// this saves the user input
$(".saveBtn").on("click", function () {
  var timeBlockID = parseInt(
    $(this)
      .closest(".time-block")
      .attr("id")
  );

  var timeBlockElement = $(`#${timeBlockID}`);
  var textareaElement = $(timeBlockElement ).children('textarea');
  var userInputValue = $(textareaElement).val();
// getting the value
  eachTime[timeBlockID].value = userInputValue;

  updateDOM();
// saving the item
  localStorage.setItem("ToDo", JSON.stringify(eachTime));
});