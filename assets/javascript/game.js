$(document).ready(function(){

    //define the initial array of gif topics
    var gifs = ["The Walking Dead", "Game of Thrones", "Breaking Bad", "Daredevil", "The Social Network", "The Last of Us", "The Avengers", "Captain America", "Batman", "The Flash", "Wonderwoman", "Arrow", "The Punisher"];

    //This function calls the giphy API and assigns the data to each array item
    function displayGifInfo() {
        var dataGiphy = $(this).attr("data-gif");
        var random = Math.floor(Math.random() * (100 - 2)) + 2;

        //query for the giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            dataGiphy + "&api_key=dc6zaTOxFJmzC" + "&offset=" + random;

        //The ajax call and getting the info from the API
        $.ajax({
            url: queryURL,
            method: "GET"
            }).done(function(response) {
            var results = response.data;
            console.log(results);

            //A loop that gathers every array item and assigns it an image along with attributes
            for (var i = 0; i < results.length; i++) {
                //assigns the image tag
                var gifImage = $("<img>");
                //assigns the image tag to the attribute of the gif image
                gifImage.attr("src", results[i].images.fixed_height.url);
                //assigns the class of control to the the gif image
                gifImage.addClass("control");
                //assigns the attribute of data-still to the gif image. Data still is the animated gif pulled from the API
                gifImage.attr("data-still", results[i].images.fixed_height.url);
                //assigns the attribute of data-animate to the gif image. Data animate is the paused gif pulled from the API
                gifImage.attr("data-animate", results[i].images.fixed_height_still.url);
                //assigns the still string to the data still attribute and the assigns the attribute to the gif image
                gifImage.attr("data-state", "still");
                //prepends all of the gif images to the div id of gifs appear here
                $("#gifs-appear-here").prepend(gifImage);
            }

            //When the gif image is clicked then it will pause or animate
            $(".control").on("click", function() {
                var state = $(this).attr("data-state");
                //if the state attribute equals the string of still then the src is changed to animate
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                //if the state is the opposite then it changes the src to still and pauses the gif
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        });
    };

    //this function applies of the gif array items to a button on the page
    function renderButtons() {
        //this clears the buttons from the page
        $("#newGif").empty();
        //this replaces the empty text field with an empty string
        $("#userInput").val("");

        //a for loop that runs through the entire array and assigns each item to a button
        for(i = 0; i < gifs.length; i++) {
            //creates the button tag
            var newButton = $("<button>")
                //adds the classes
                .addClass("gifFormat btn btn-primary")
                //adds the attribute named data gif and assigns the array item to the attribute
                .attr("data-gif", gifs[i])
                //applies the array item name to the button text
                .text(gifs[i]);
            //applies the button to the div id of newGif
            $("#newGif").append(newButton);
        }
    };

    //This gives the user the option to add their own buttons to the screen
    $("#add-gif").on("click", function(event) {
        
        //prevents the screen from reloading when pressing the submit button
        event.preventDefault();

        //gets the input from the user
        var userInput = $("#userInput").val();

        //If the user input is not equal to an array item then push it to the screen and run the renderButtons function else empty the user input text field
        if (userInput.length != 0 && gifs.indexOf(userInput) === -1) {
          gifs.push(userInput);
          $("#userInput").val();
          renderButtons();
        } else {
          $("#userInput").val("");
        }
    });

    //allow all buttons to be clickable if they have the class of gifformat and then run the function of displayGifInfo
    $(document).on("click", ".gifFormat", displayGifInfo);

    //render the buttons to the screen on document load
    renderButtons(); 
})