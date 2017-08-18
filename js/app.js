// Enemies our player must avoid during gameplay.
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same movement for
// all computers.

Enemy.prototype.update = function(dt) {
    // If the enemy's x-coordinate puts it off the board to the right,
    // meaning it has completed its trek from left to right, reset the
    // x-coordinate to a negative number to restart the enemy across the board from
    // left to right again, ensuring an endless parade of enemies.
    this.movement = Math.random() * 350 + 1;
    this.x += this.movement * dt;
    if (this.x > 505) {
        this.x = Math.random() - 600;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class.
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 505 / 2 - 50;
    this.y = 380;
};

// Update the player's position, required method for game.
// Initial and collision detection location of the player is center bottom.
Player.prototype.update = function() {
    this.collisionDetection();
};

// Draw the player on the screen, required method for game.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Create function to display the player's score on the game board.
function drawScore() {
    ctx.font = "30px Verdana";
    ctx.fillstyle = 'black';
    ctx.fillText("Score: " + score, 310, 90);
}

// Collision detection.
// A collision occurs when the player-controlled character and enemy (bug) overlap.
// Set score to zero since the player game is over upon colliding with an enemy.
Player.prototype.collisionDetection = function() {
    for (var i = 0; i < allEnemiesLength; i++) {
        if (this.x < (allEnemies[i].x + 50) &&
            (this.x + 50) > allEnemies[i].x &&
            this.y < (allEnemies[i].y + 40) &&
            (40 + this.y) > allEnemies[i].y) {
            this.resetGame();
            score = 0;
        }
    }
};

// The player can only navigate the canvas board boundaries using keyboard arrows (up, down, left, right).
// Any time the player reaches the blue water, the scores increases by 1.
// The player location then resets back to the initial starting point.
Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'up') {
        if (this.y < 83) {
            score++;
            this.resetGame();
        } else {
            this.y -= 83;
        }
    } else if (allowedKeys === 'down') {
        if (this.y > 350) {
            return null;
        } else {
            this.y += 83;
        }
    } else if (allowedKeys === 'left') {
        if (this.x < 100) {
            return null;
        } else {
            this.x -= 101;
        }
    } else if (allowedKeys === 'right') {
        if (this.x > 400) {
            return null;
        } else {
            this.x += 101;
        }
    }
};

// Game over.
// The gameplay is reset whenever the player and enemy collide.
Player.prototype.resetGame = function() {
    this.x = 505 / 2 - 50;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Enemy Board Placement
var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-475, 60);
var enemy3 = new Enemy(-100, 145);
var enemy4 = new Enemy(-250, 135);
var enemy5 = new Enemy(-750, 145);
var enemy6 = new Enemy(-275, 210);
var enemy7 = new Enemy(-525, 225);

// An enemy array containing 7 enemy objects.
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];
var allEnemiesLength = allEnemies.length;

// Player object variable.
var player = new Player();

// Player score starts at zero.
var score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});