//default character stats

var characterList = [
    {
        name: "Yoda",
        health: 90,
        attack: 15,
        counter: 20,
        defaultAttack: 15,
        pic:""
    }, {
        name: "Chirrut",
        health: 150,
        attack: 12,
        counter: 19,
        defaultAttack: 12,
        pic:""
    }, {
        name: "Darth Vader",
        health: 170,
        attack: 16,
        counter: 21,
        defaultAttack: 16,
        pic:""
    }, {
        name: "Jabba",
        health: 100,
        attack: 6,
        counter: 10,
        defaultAttack: 6,
        pic:""
    }
];

// variables for getting the game started
var gameRoster = [];
var player = {};
var computer = {};
var playerPicked = false;
var computerPicked = false;
var intervalId;
var gameRunning = false;

// new/reset game functions
function newGame() {
    gameRoster = [...characterList];
    console.log(characterList);
    player = {};
    computer = {};
    gameRunning = true;
    playerPicked = false;
    computerPicked = false;
    $("#character-grid").hide();
    clearInterval(intervalId);
    printCharacters(gameRoster);
}

function printCharacters(characterArray) {
    $("#character-list").empty();

    if (characterArray.length === 0) {
        $("#character-list").text("No characters Remain!");
        return false;
    }

    characterArray
        .forEach(function (characterInfo, i) {

            var character = $("<div class='character'>");
            character
                .css({
                    "background-image": "url(" + characterInfo.pic + ")"
                })
                .attr({"data-id": i});

                var charStats = $("<div>");
                charStats
                    .addClass("character-stats")
                    .html(`<h4>${characterInfo.name}</h4>HP: ${characterInfo.health} <br/>Attack: ${characterInfo.attack} <br/>Counter: ${characterInfo.counter}`)
                    .appendTO(character);

                $("#character-list").append(character)
            })
        }

// add player to active game area
function activatePlayer(playerInfo, playerPosition, playerStats, playerTitle) {
    console.log(playerInfo, playerPosition);

    $(playerPosition).css({
        "background-image": "url(" + playerInfo.pic + ")"
    });

    $(playerStats).html(`<h4>${playerInfo.name}</h4>HP: ${playerInfo.health} <br/>Attack: ${playerInfo.attack} <br/>Counter: ${playerInfo.counter}`)
    .removeClass("defeated");
}

// select a character
$(document)
        .on("click", ".character", function () {
            // get character id so we can pull from gameRoster array by it's index
            var playerId = $(this).attr("data-id");

            if (!playerPicked && gameRunning) {
                playerPicked = true;
                player = {...gameRoster[playerId]
            };
            $("#character-grid").show();
            gameRoster.splice(playerId, 1);
            printCharacters(gameRoster);
            activatePlayer(player, "#player", "#player-stats", "Attacker");
        } else if (!computerPicked && gameRunning) {
            computerPicked = true;
            computer = {...gameRoster[playerId]
            };
            gameRoster.splice(playerID, 1);
            printCharacters(gameRoster);
            activatePlayer(computer, "#computer", "computer-stats", "Defender");
        } else {
            console.log("Both players are active");
        }
});

function attack() {
    // player attacks computer
    computer.health -= player.attack;
    // player's attack increases
    player.attack += player.defaultAttack;

    // checking if defender has lost
    if (computer.health <= 0) {
        computerPicked = false;
        $("#computer-stats")
            .html(`<h3>DEFEATED!</h3><h4>${computer.name} - Defender</h4>HP: ${computer.health} <br/>Attack: ${computer.attack} <br/>Counter: ${computer.counter}`)
            .addClass("defeated");

    // checking if there are any player remaining
    if (gameRoster.length === 0) {
        clearInterval(intervalID);
        gameRunning = false;
        $("#quote").text("Won, you have. Start a new game, you must.");
    }
    return false;
    }

    // computer attacks player
    player.health -= computer.counter;

    $("#player-stats").html(`<h4>${player.name} - Attacker</h4>HP: ${player.health} <br/>Attack: ${player.attack} <br/>Counter: ${player.counter}`);

    $("#computer-stats").html(`<h4>${computer.name} - Defender</h4>HP: ${computer.health} <br/>Attack: ${computer.attack} <br/>Counter: ${computer.counter}`);

    if (player.health <= 0) {
        playerPicked = false;
        computerPicked = false;
        gameRunning = false;
        $("#playerr-stats")
        .html(`<h3>DEFEATED!</h3><h4>${player.name} - Defender</h4>HP: ${player.health} <br/>Attack: ${player.attack} <br/>Counter: ${player.counter}`)
        .addClass("defeated");

        clearInterval(intervalID);
        $("#quote").text("You've lost! Start a new game.")
    }
}

// New Game Button

$("#new-game").on("click", newGame);

// Attack Button
$("attack").on("click", function() {
    if (playerPicked && computerPicked && gameRunning) {
        attack();
    } else {
        console.log("Pick a player to begin!")
    }
});

newGame();