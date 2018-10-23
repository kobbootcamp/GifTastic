$(document).ready(function () {

  // Initial array of animals
  var animals = ["pig", "cow", "goat", "dog", "chicken", "lamb", "horse"];

  // Function for displaying animal data
  function renderButtons() {

    // clear animal buttons
    $("#barnYard").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
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




   $(document).on("click", ".gif", stopOrGo);




   function stopOrGo (){
    if ($(this).attr("state") === "still") {
    // {
        $(this).attr("state", "animate")
      $(this).attr("src", $(this).attr("data-animate"))
    } 
    else if($(this).attr("state") === "animate") 
    {
      $(this).attr("state", "still");
      $(this).attr("src", $(this).attr("data-still"))
    }
  }





  $("#add-animal").on("click", function(event) {

    // prevent form submitssion
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



  
  $(document).on("click", ".animal-btn", displayAnimalGiphy);

  




  function displayAnimalGiphy() {

    $("#barnYardStage").html("");

    // alert($(this).attr("data-name"));

    var thisAnimal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&limit=10&api_key=fEpDmXunynP0VfXAgS71u6dxFuRorLmd";

    $.ajax({ url: queryURL, method: "GET" })
      .done(function (response) {
        // console.log(response.data[0].rating);
        console.log(response);

        var results = response.data;


        for (i = 0; i < results.length; i++) {


          var stillImage = response.data[i].images.original_still

          var animalDiv = $("<div class='animal'>")

          var rating = (response.data[i].rating)

          var thisRating = $("<p>").text("Rating: " + rating);

          thisRating.addClass("ratingDiv");

          animalDiv.append(thisRating);

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



          animalDiv.append($(gifHolder))


          $("#barnYardStage").append(animalDiv)
          // var thisGiphyid = (response.data[i].id)
          console.log(gifHolder.attr("state"))
        }

        //https://media.giphy.com/media/

      })


  }



  //make buttons
  renderButtons();
})
