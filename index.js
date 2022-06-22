alert("Instructions: \n Catch the bus or finish your homework for +1 points. \n Crash into a car or hit a stop sign, start again.");

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// top bush image
var topBushReady = false;
var topBushImage = new Image();
topBushImage.onload = function () {
    topBushReady = true;
};
topBushImage.src = "images/topBush.jpg";

// side bush image
var sideBushReady = false;
var sideBushImage = new Image();
sideBushImage.onload = function () {
    sideBushReady = true;
};
sideBushImage.src = "images/sideBush.jpg";

// bottom bush image
var bottomBushReady = false;
var bottomBushImage = new Image();
bottomBushImage.onload = function () {
    bottomBushReady = true;
};
bottomBushImage.src = "images/bottomBush.jpg";

// Student image
var studentReady = false;
var studentImage = new Image();
studentImage.onload = function () {
    studentReady = true;
};
studentImage.src = "images/student.png";

// Bus image
var busReady = false;
var busImage = new Image();
busImage.onload = function () {
    busReady = true;
};
busImage.src = "images/bus.png";

//Homework Image
var homeworkReady = false;
var homeworkImage = new Image();
homeworkImage.onload = function(){
    homeworkReady = true;
}
homeworkImage.src = "images/homework.png";

//Car Image
var carReady = false;
var carImage = new Image();
carImage.onload = function(){
    carReady = true;
}
carImage.src = "images/car.png";

//Stop Image
var stopSignReady = false;
var stopSignImage = new Image();
stopSignImage.onload = function(){
    stopSignReady = true;
}
stopSignImage.src = "images/stopSign.png";



// Game objects
var homeworkCounter = 0;
var busCounter = 0;
var totalPoints = 0;
totalPoints = homeworkCounter + busCounter;
var student = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var bus = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var homework = {
        x: 0,
        y: 0
    };
var car = {
        x: 0,
        y: 0
};
var stopSign = {
    x: 0,
    y: 0
};
// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    // console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
    // console.log(keysDown);
}, false);

addEventListener("keyup", function (e) {
    // console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);


// ====

//function start here

// Update game objects
let update = function (modifier) {
    //move if key down but not if about to move into bushed
    if (38 in keysDown && student.y > 32+2) { //  holding up key
        student.y -= student.speed * modifier;
    }
    if (40 in keysDown && student.y < canvas.height - (81 + 2)) { //  holding down key (char height + 32 + 2)
        student.y += student.speed * modifier;
    }
    if (37 in keysDown && student.x > (32+2)) { // holding left key
        student.x -= student.speed * modifier;
    }
    if (39 in keysDown && student.x < canvas.width - (67 + 2)) { // holding right key (char width + 32 + 2)
        student.x += student.speed * modifier;
    }
    

    // Are they touching?
    if (
        student.x <= (bus.x + 70)
        && bus.x <= (student.x + 30)
        && student.y <= (bus.y + 20)
        && bus.y <= (student.y + 45) // char height + 32
    ) {
        ++busCounter;       // keep track of our “score”
        ++totalPoints;
        console.log(busCounter);
        reset();       // start a new cycle
    }

    if (
        student.x <= (homework.x + 70)
        && homework.x <= (student.x + 30)
        && student.y <= (homework.y + 20)
        && homework.y <= (student.y + 45) // char height + 32
    ) {
        ++homeworkCounter;       // keep track of our “score”
        ++totalPoints;
        console.log(homeworkCounter);
        reset();       // start a new cycle
    }

    if (
        student.x <= (stopSign.x + 70)
        && stopSign.x <= (student.x + 30)
        && student.y <= (stopSign.y + 20)
        && stopSign.y <= (student.y + 45) // char height + 32
    ) {
        userLost();
    }

    if (
        student.x <= (car.x + 70)
        && car.x <= (student.x + 30)
        && student.y <= (car.y + 20)
        && car.y <= (student.y + 45) // char height + 32
    ) {
        userLost();
    }

    if ((totalPoints) === 10){
        userWins();
    }
};


let userLost  = function(){
    alert("Avoid obstacles like cars and stop signs to avoid losing. Try again!");
    reset();
    busCounter = 0;
    homeworkCounter = 0;
    totalPoints = 0;
}

let userWins = function(){
    if ((totalPoints) === 10){
        alert("Nice Job! You win :)");
        reset();
        busCounter = 0;
        homeworkCounter = 0;
        totalPoints = 0;
    }
}



// Draw everything in the main render function
let render = function () {
    if (bgReady) {
        // console.log('here2');
        ctx.drawImage(bgImage, 0, 0);
    }
    if (topBushReady) {
        // console.log('here2');
        ctx.drawImage(topBushImage, 0, 0);
    }
    if (sideBushReady) {
        // console.log('here2');
        ctx.drawImage(sideBushImage, 0, 0);
        ctx.drawImage(sideBushImage, 965, 0);
    }
    if (bottomBushReady){
        ctx.drawImage(topBushImage, 0, 965);
    }

    if (studentReady) {
        ctx.drawImage(studentImage, student.x, student.y);
    }

    if (busReady) {
        ctx.drawImage(busImage, bus.x, bus.y);
    }

    if (homeworkReady){
        ctx.drawImage(homeworkImage, homework.x, homework.y);
    }

    if (stopSignReady){
        ctx.drawImage(stopSignImage, stopSign.x, stopSign.y);
    }

    if (carReady){
        ctx.drawImage(carImage, car.x, car.y);
    }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        // ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
        ctx.fillText("Bus Counter: " + busCounter, 0, 0);
        ctx.fillText("Homework Counter: " + homeworkCounter, 750, 0);
        ctx.fillText("Total Points: " + totalPoints, 415, 0);

};

// Reset the game when the player catches a monster
var reset = function () {
    student.x = canvas.width / 2;
    student.y = canvas.height / 2;

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    bus.x = 32 + (Math.random() * (canvas.width - 149)); //(32 + 32 + width)
    bus.y = 32 + (Math.random() * (canvas.height - 93)); //(32 + 32 + height)

    homework.x = 32 + (Math.random() * (canvas.width - 134)); //(32 + 32 + width)
    homework.y = 32 + (Math.random() * (canvas.height - 134)); //(32 + 32 + height)

    stopSign.x = 32 + (Math.random() * (canvas.width - 149)); //(32 + 32 + width)
    stopSign.y = 32 + (Math.random() * (canvas.height - 149)); //(32 + 32 + height)
    
    car.x = 32 + (Math.random() * (canvas.width - 149)); //(32 + 32 + width)
    car.y = 32 + (Math.random() * (canvas.height - 97)); //(32 + 32 + height)
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;

    if (busCounter < 10){
        requestAnimationFrame(main);
    }
    //  Request to do this again ASAP

};


//=======
//loop at end after all is defined
//executing code
// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.