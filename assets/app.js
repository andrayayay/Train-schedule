$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD7mkCDzRqdSsYYsnhc38c4T3-vlKfU-EU",
    authDomain: "train-schedule-8283a.firebaseapp.com",
    databaseURL: "https://train-schedule-8283a.firebaseio.com",
    projectId: "train-schedule-8283a",
    storageBucket: "train-schedule-8283a.appspot.com",
    messagingSenderId: "629238457899"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // train input 
    userTrainName = $("#train-name-input").val().trim();
    userDestination = $("#destination-input").val().trim();
    userTrainTime = $("#time-input").val().trim();
    userFrequency = $("#frequency-input").val().trim();

    // push to database
    database.ref().push({
        name: userTrainName,
        destination: userDestination,
        time: userTrainTime,
        frequency: userFrequency,
        dataAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // clear out text-box
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

// adding children to train schedule
database.ref().on('child_added', function(snapshot){
    // console.log(snapshot.val());

    var userTrainName = snapshot.val().name;
    var userDestination = snapshot.val().destination;
    var userTrainTime = snapshot.val().time;
    var userFrequency = snapshot.val().frequency;

    console.log(userTrainName);
    console.log(userDestination);
    console.log(userTrainTime);
    console.log(userFrequency);

    // moment math
    var tStart = userTrainTime;
    var tFrequency = userFrequency;

// First Time Train from user?
    var firstTimeConverted = moment(tStart, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted + "User Train Time Input");

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

// Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("Next Train" + nextTrain);

// adding a new row to train schedule
var newRow = $("<tr>");
    newRow.append("<td>" + userTrainName + "</td>");
    newRow.append("<td>" + userDestination + "</td>");
    newRow.append("<td>" + userTrainTime + "</td>");
    newRow.append("<td>" + userFrequency + "</td>");
    newRow.append("<td>" + nextTrain + "</td>");
    newRow.append("<td>" + tMinutesTillTrain + "</td>");
    newRow.append("<td>" + '<i class="fa fa-trash" id="trashcan" aria-hidden="true"></i>' + "</td>");
    

    $("#train-table").append(newRow);
})

// this only temporarily removes row - doesn't delete from database 
// and row will show back up when refreshed
var rootRef = firebase.database().ref().child("train-schedule-8283a");
$("body").on("click", "#trashcan", function() {
    alert("You have removed train info from your browser");
    $(this).closest("tr").remove();
    var rowId = $row.data('id');
        rootRef.child(rowId).remove()
    var assetKey = rootRef.child("id");
    //it should remove the firebase object in here
    rootRef.child(assetKey).remove()
    //after firebase confirmation, remove table row
    .then(function() {
      $row.remove();
    })
    //Catch errors
    .catch(function(error) {
      console.log('ERROR');
    });  
  });

});

