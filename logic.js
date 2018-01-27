  var config = {
    apiKey: "AIzaSyD7wHepyaqVMfuUKDNNDA-b6wMmBgPv4PM",
    authDomain: "fir-a2425.firebaseapp.com",
    databaseURL: "https://fir-a2425.firebaseio.com",
    projectId: "fir-a2425",
    storageBucket: "",
    messagingSenderId: "791868266735"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#newName").val().trim();
    var destination = $("#newDestination").val().trim();
    var time = $("#newTime").val().trim();
    var frequency = $("#newFrequency").val().trim();

    var newLine = {
      train: name,
      destination: destination,
      time: time,
      frequency: frequency
    };

    database.ref().push(newLine);

    $('#newName').val('');
    $('#newDestination').val('');
    $('#newTime').val('');
    $('#newFrequency').val('');



  });


  database.ref().on("child_added", function(childSnapshot) {
    var frequency = childSnapshot.val().frequency;

    var timeConverted = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(timeConverted), "minutes");

    var tMinutesTillTrain = frequency - (diffTime % frequency);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#fill").append("<tr><td>" + childSnapshot.val().train + "</td><td>" + childSnapshot.val().destination + "</td><td>" + frequency + "</td><td>" +moment(nextTrain).format("hh:mm")+ "</td><td>"+tMinutesTillTrain+"</td></tr>")

  });


