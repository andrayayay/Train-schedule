
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

    newTrain = {
        name: userTrainName,
        destination: userDestination,
        time: userTrainTime,
        frequency: userFrequency
    };

    // pushes train data to firebase 
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // clear out text-box
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// firebase event for addng train to database and HTML 
database.ref().on("child_added",function(childSnapshot){
    console.log(childSnapshot.val());

// variables to store the data from firebase
   

    // console.log(newTrain.name);
    // console.log(newTrain.destination)
    // console.log(newTrain.time);
    // console.log(newTrain.frequency);
    // console.log(minsTillArrival);
    // console.log(nextTrain);

 

    // timeDisplay = moment.unix(trainTime).format("MM/DD/YYYY");

    // calculations go here
        // NEXT ARRIVAL 
            // MINUTES AWAY 

    // // create new rows
    newRow = $("<tr>").append(
        $("<td>").text(userTrainName),
        $("<td>").text(userDestination),
        $("<td>").text(userTrainName),
        $("<td>").text(userFrequency),
    //     $("<td>").text(minsTillArrival),
    //     $("<td>").text(nextTrain)
    );

    // // append new row to table
    // $("#train-table > tbody").append(newRow);
})