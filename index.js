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

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var monstersCaught = 0;

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
    // if (38 in keysDown) { // Player holding up
    //     hero.y -= hero.speed * modifier;
    // }
    // if (40 in keysDown) { // Player holding down
    //     hero.y += hero.speed * modifier;
    // }
    // if (37 in keysDown) { // Player holding left
    //     hero.x -= hero.speed * modifier;
    // }
    // if (39 in keysDown) { // Player holding right
    //     hero.x += hero.speed * modifier;
    // }


    //move if key down but not if about to move into bushed
    if (38 in keysDown && hero.y > 32+2) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (81 + 2)) { //  holding down key (char height + 32 + 2)
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (32+2)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (67 + 2)) { // holding right key (char width + 32 + 2)
        hero.x += hero.speed * modifier;
    }
    

    // Are they touching?
    if (
        hero.x <= (monster.x + 70)
        && monster.x <= (hero.x + 30)
        && hero.y <= (monster.y + 20)
        && monster.y <= (hero.y + 45) // char height + 32
    ) {
        ++monstersCaught;       // keep track of our “score”
        console.log(monstersCaught);
        reset();       // start a new cycle
    }

};






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

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        // ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
        ctx.fillText("Goblins caught: " + monstersCaught, 0, 0);

};

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    monster.x = 32 + (Math.random() * (canvas.width - 149)); //(32 + 32 + width)
    monster.y = 32 + (Math.random() * (canvas.height - 149)); //(32 + 32 + height)
};


/*
// let x = 1;
// The main game loop
var main = function () {
    render();
    // Request to do this again ASAP using the Canvas method,
// it’s much like the JS timer function “setInterval, it will
// call the main method over and over again so our players 
// can move and be re-drawn
// console.log(x);
// x++;
    requestAnimationFrame(main); 
};
*/

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};


//=======
//loop at end after all is defined
//executing code
// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.