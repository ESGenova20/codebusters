window.addEventListener('DOMContentLoaded', game);

//Import necessary images
var sprite = new Image();
var spriteExplosion = new Image();

sprite.src = 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80';

window.onload = function() {
    spriteExplosion.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/explosion_g9ncyg.png';
};

//Main function for the whole game
function game() {
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),

        //Get the height and width for the game shield
        ctxHeight = ctx.canvas.height = window.innerHeight,
        ctxWidth = ctx.canvas.width  = window.innerWidth;

    //Set a value of assets
    var bullets = [],
        enemies = [],
        explosions = [],
        destroyed = 0,
        record = 0,
        count = 0,
        playing = false,
        gameOver = false,
        country = {deg: 0}

    //Weapon's coordinates
    var player = {
        posX : -35,
        posY : -180,
        width : 70,
        height : 70,
        deg : 0
    };

    //Make the weapon work
    canvas.addEventListener('click', action);
    canvas.addEventListener('mousemove', action);

    //Coincidence of the weapon and the mouse
    function move(mouseDirection) {
        player.deg = Math.atan2(mouseDirection.offsetX - (ctxWidth/2), -(mouseDirection.offsetY - (ctxHeight/2)));
    }
}