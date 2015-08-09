// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Initial location of enemy
    this.x = 0;
    this.y = 60;
    //speed factor will be a number between 75 & 275
    this.speed = Math.floor(Math.random()*(200)+75);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    newx = this.x +=this.speed*dt
    if ( (newx) > 500) {
      this.x = 0;
      this.speed = Math.floor(Math.random()*(200)+75);
    }
    else {
      this.x = newx;
    };

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-horn-girl.png';
  this.x = 200;
  this.y = 400;
}

Player.prototype.update = function(dt) {
  //if there is a collision with one of the enemies, reset player
  for (i=0; i < allEnemies.length; i++) {
    if (Math.abs(this.x-allEnemies[i].x)<35 &&
        Math.abs(this.y-allEnemies[i].y)<35) {
      this.reset();
    }
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
//need to fill in moves for various key presses
  if (key == 'left') {
    if (this.x - 100 >= 0) {
      this.x -= 100;
    }
  }
  else if (key == 'right') {
    if (this.x + 100 < 500) {
      this.x += 100;
    }
  }
  else if (key == 'up') {
    if (this.y - 82 >= 71) {
      this.y -= 82;
    }
    //reset when you reach the water
    else {
      this.reset();
    }
  }
  else if (key == 'down') {
    if (this.y + 82 <= 401) {
      this.y += 82;
    }
  }

}

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy;
var bug2 = new Enemy;
var bug3 = new Enemy;
bug2.y += 85;
bug3.y += 170;
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
var player = new Player;

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
