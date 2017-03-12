$(document).ready(function(){

    var animals = ["Cat", "Dog", "Bird", "Snake", "Lion", "Elephant", "Horse", "Duck", "Panda"];

    function displayAnimalInfo() {
        var dataAnimal = $(this).attr("data-animal");
        var random = Math.floor(Math.random() * (100 - 2)) + 2;

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            dataAnimal + "&api_key=dc6zaTOxFJmzC" + "&offset=" + random;

        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                //var gifDiv = $("<div class='item'>");
                //var rating = results[i].rating;
                //var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalImage.addClass("control");
                animalImage.attr("data-still", results[i].images.fixed_height.url);
                animalImage.attr("data-animate", results[i].images.fixed_height_still.url);
                animalImage.attr("data-state", "still");
                //gifDiv.prepend(p);
                //gifDiv.prepend(animalImage);
                $("#gifs-appear-here").prepend(animalImage);
            }

            $(".control").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        });
    };

    function renderButtons() {

        $("#newAnimal").empty();
        $("#userInput").val("");

        for(i = 0; i < animals.length; i++) {
            var newButton = $("<button>")
                .addClass("animalFormat btn btn-danger")
                .attr("data-animal", animals[i])
                .text(animals[i]);
            $("#newAnimal").append(newButton);
        }
    };

    $("#add-animal").on("click", function(event) {
        event.preventDefault();

        var userInput = $("#userInput").val();

        if (userInput.length != 0 && animals.indexOf(userInput) === -1) {
          animals.push(userInput);
          $("#userInput").val();
          renderButtons();
        } else {
          $("#userInput").val("");
        }
    });

    $(document).on("click", ".animalFormat", displayAnimalInfo);

    renderButtons(); 
})