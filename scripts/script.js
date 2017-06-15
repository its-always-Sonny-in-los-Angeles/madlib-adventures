$(function () {

    var views = [".homeView", ".characterView", ".storyView", ".madlibView"];
    var currentView = 0;
    var currentScene; //load the first scene of the story
    var storyInfo; //object used to store info for current game
    var availablePoints; //additional points player can spend on stats

    var points = $("div.points");

    function resetGame() {
        storyInfo = {};
        availablePoints = 5;
        points.html(`<p>Available Points: ${availablePoints}</p>`);
    }

    resetGame();

    // change the current view. Takes in "next", "previous", or a number
    function updateView(direction) {
        $(views[currentView]).toggleClass("hidden");

        if (direction === "next") {
            currentView = currentView + 1;
        } else if (direction === "previous") {
            currentView = currentView - 1;
        } else if (!isNaN(direction)) {
            // go a view with specified index
            currentView = direction;
        } else {
            console.log("Wrong argument to update view function");
        }
        // show the new view
        $(views[currentView]).toggleClass("hidden");
    }

    //set title for each story shown on main menu
    $(".story1").text(story.title);

    $(".story").on("click", function (e) {
        e.preventDefault();
        currentScene = story.L1;
        updateView("next");
    });

    //change image to gif on hover for the main menu
    $(".gif").hover(
        function () {
            var src = $(this).prev().attr("src");
            $(this).prev().attr("src", src.replace(/\.png$/i, ".gif"));
        },
        function () {
            var src = $(this).prev().attr("src");
            $(this).prev().attr("src", src.replace(/\.gif$/i, ".png"));
        }
    );

    var increaseButton = $("button.increase");
    increaseButton.on("click", function (e) {
        e.preventDefault();
        if (availablePoints > 0) {
            availablePoints = availablePoints - 1;
            points.html(`<p>Available Points: ${availablePoints}</p>`);
            var newVal = parseInt($(this).siblings("input").val()) + 1;
            $(this).siblings("input").val(newVal);
        }
    });

    var decreaseButton = $("button.decrease");
    decreaseButton.on("click", function (e) {
        e.preventDefault();
        // increase 1 in the input field
        var currentVal = parseInt($(this).siblings("input").val());
        if (currentVal > 2) {
            availablePoints = availablePoints + 1;
            points.html(`<p>Available Points: ${availablePoints}</p>`);
            var newVal = parseInt($(this).siblings("input").val()) - 1;
            $(this).siblings("input").val(newVal);
        }
    });

    $("form.characterCreate").on("submit", function (e) {
        e.preventDefault();
        if (availablePoints > 0) {
            // alert user to spend all points before submitting
            alert("Spend your available points yo.");
        } else {
            var name = $("input[name=name]").val();
            var strength = $("input[name=strength]").val();
            var speed = $("input[name=speed]").val();
            var charisma = $("input[name=charisma]").val();
            storyInfo.character = {
                name: name,
                strength: strength,
                speed: speed,
                charisma: charisma,
                weapon: ""
            };

            $(this)[0].reset(); //reset the form

            //check if there are madlibs required for the first scene
            if (currentScene.requiredMadlibs.length > 0) {
                $("form.madlib").html(""); //reset madlib form
                currentScene.requiredMadlibs.forEach(function (madlib) {
                    $("form.madlib").append(
                        `<label for="${madlib}">${madlib}</label>
						<input name="${madlib}" type="text" required>`);
                });
                $("form.madlib").append("<button>Start Game</button>");
                updateView(3); // go to madlib form
            } else {
                updateScene(currentScene);
                updateView("next");
            }
        }
    });

    $("form.madlib").on("submit", function (e) {
        e.preventDefault();
        // before next scene take the form results and plug into next scene object
        currentScene.requiredMadlibs.forEach(function (madlib) {
            function isMadlib(element) {
                return element.madlib === madlib;
            }
            var foundMadlib = currentScene.userMadlibs.find(isMadlib);
            foundMadlib.value = $(`input[name="${madlib}"]`).val();
        });
        updateScene(currentScene); // currentScene has already been updated to the next scene (see updateScene function)
        updateView("previous");
    });

    function updateScene(scene) {
        $(".content__story").html(scene.storyContent(storyInfo)); // see exampleScene.js
        $(".choices").html("");  // ?

        // if this is an ending scene, make button to return to home page
        if (scene.choices.length === 0) {
            $(".choices").append("<button class='return'>Return To Main Menu</button>");
            $("button.return").on("click", function () {
                updateView(0);
                resetGame();
            });
        }

        // we want to check if the next scene that we're supposed to go requires a madlib
        // if we do need a madlib, then we generate the form then show the madlib view, and on submit then we go to the next view
        // if we don't need a madlib then go directly to next scene

        for (let i = 0; i < scene.choices.length; i++) {
            $(".choices").append(`<button class="choice ${i}">${scene.choices[i].choice}</button>`);

            $(`button.choice.${i}`).on("click", function () {
                // on button click update the scene           
                let nextScene = scene.choices[i].getNextScene(storyInfo);
                if (nextScene.requiredMadlibs.length > 0) {
                    $("form.madlib").html("");
                    nextScene.requiredMadlibs.forEach(function (madlib) {
                        $("form.madlib").append(
                            `<label for="${madlib}">${madlib}</label>
							<input name="${madlib}" type="text" required>`);
                    });
                    $("form.madlib").append("<button>Submit</button>");
                    updateView("next");
                } else {
                    updateScene(nextScene);
                }

                currentScene = nextScene;
            });
        }
    }

});



