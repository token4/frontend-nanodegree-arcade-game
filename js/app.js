// Enemies our player must avoid
var Enemy = function(startX, startY) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Initial location of enemy
    this.x = startX;
    this.y = startY;
    //speed factor will be a number between 75 & 275
    this.speed = Math.floor(Math.random()*(200)+75);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newx = this.x +=this.speed*dt;
    if ( (newx) > 500) {
        this.x = 0;
        this.speed = Math.floor(Math.random()*(200)+75);
    }
    else {
        this.x = newx;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
  //if there is a collision with one of the enemies, reset player
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(this.x-allEnemies[i].x)<35 &&
            Math.abs(this.y-allEnemies[i].y)<35) {
            this.reset("loss");
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
//need to fill in moves for various key presses
    if (key == 'left') {
        if (this.x - 101 >= 0) {
            this.x -= 101;
          }
    }
    else if (key == 'right') {
        if (this.x + 101 < 500) {
            this.x += 101;
          }
    }
    else if (key == 'up') {
        if (this.y - 83 >= 71) {
            this.y -= 83;
          }
        //reset when you reach the water
        else {
          this.reset("win");
        }
    }
    else if (key == 'down') {
        if (this.y + 83 <= 401) {
            this.y += 83;
          }
    }
};

Player.prototype.reset = function(status) {
    //reset player to original location
    this.x = 200;
    this.y = 400;
    //update and show number of wins
    if (status == "win") {
      winCount++;
      document.getElementById("win").innerHTML = "Wins: " +winCount;
    }
    //update and show number of losses
    else if (status == "loss") {
      lossCount++;
      document.getElementById("loss").innerHTML = "Losses: " +lossCount;
    }
    //not sure this else is even needed
    else {
      console.log("Something's weird about how the player got reset");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var winCount = var lossCount = 0;
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(0, 60+(85*i)));
}
var player = new Player();

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
