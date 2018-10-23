$(document).ready(function () {

  // Initial array of animals
  var animals = ["pig", "cow", "goat", "dog", "chicken", "lamb", "horse"];

  // Function for displaying animal data
  function renderButtons() {

    // clear animal buttons
    $("#barnYard").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

      // Then dynamically generating buttons for each animal in the array.
      var a = $("<button>");

      // Adding class to the button
      a.addClass("animal-btn");

      // collect the data
      a.attr("data-name", animals[i]);

      // name the button
      a.text(animals[i]);

      // append to div
      $("#barnYard").append(a);
    }
  }


  //Function to play or pause gif
  function stopOrGo() {

    // if current state is "still"
    if ($(this).attr("state") === "still") {

      // change the state to "animate"
      $(this).attr("state", "animate")

      //change the source to the path stored in "data-animate"
      $(this).attr("src", $(this).attr("data-animate"))
    }
    //otherwise, if the state is "animate"
    else if ($(this).attr("state") === "animate") {

      //change the state to "still"
      $(this).attr("state", "still");

      //change the srouce to the path stored in "data-still"
      $(this).attr("src", $(this).attr("data-still"))
    }
  }


  //function for adding animal button
  $("#add-animal").on("click", function (event) {

    // prevent form submission if the user hits enter
    event.preventDefault();

    //declare variable and store name of new animal
    var typeOfAnimal = $("#newAnimal-input").val().trim();

    // add the animal to the animal array
    animals.push(typeOfAnimal);

    //clear the text box
    $("#newAnimal-input").val("");

    // make buttons
    renderButtons();
  });



  //animal button click
  $(document).on("click", ".animal-btn", displayAnimalGiphy);

  //.gif button click
  $(document).on("click", ".gif", stopOrGo);


  //display the animal gifs
  function displayAnimalGiphy() {

    //clear the current animal div
    $("#barnYardStage").html("");

    //declare variable to grab data-name
    var thisAnimal = $(this).attr("data-name");

    //declare variable to store the query definition, limit to 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&limit=10&api_key=fEpDmXunynP0VfXAgS71u6dxFuRorLmd";

    //ajax call
    $.ajax({ url: queryURL, method: "GET" })
      .then(function (response) {

        //variable to store the response object
        var results = response.data;

        //loop through results, for each...
        for (i = 0; i < results.length; i++) {

          //create div with animal class...
          var animalDiv = $("<div class='animal'>")

          //grab the gif rating from response...
          var rating = (response.data[i].rating)

          //create tag to display rating...
          var thisRating = $("<p>").text("Rating: " + rating);

          //add class to identify rating div...
          thisRating.addClass("ratingDiv");

          //append rating to animal div...
          animalDiv.append(thisRating);

          //create img and assign attributes current gif, set the default to still and the src to still url
          var gifHolder = $("<img />").attr({
            "class": "gif",
            "id": "gifHolder",
            "src": "https://media0.giphy.com/media/" + (response.data[i].id) + "/giphy_s.gif",
            "data-still": "https://media0.giphy.com/media/" + (response.data[i].id) + "/giphy_s.gif",
            "data-animate": "https://media.giphy.com/media/" + (response.data[i].id) + "/giphy.gif",
            "state": "still",
            "alt": "gif",
            "width": 375,
            "height": 250
          })


          //append the gifholder to the animal div
          animalDiv.append($(gifHolder))

          //append the animal to the "bardyardstage"
          $("#barnYardStage").append(animalDiv)
        }

      })


  }



  //make buttons
  renderButtons();
})
