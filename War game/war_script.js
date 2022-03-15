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

    //Prevent unexepcted actions
    function action(mouseDirection) {
        mouseDirection.preventDefault();

        if(playing) {
            //Coincidence of the shot and the weapon
            var weapon = {
                x: -8,
                y: -179,
                sizeX: 20,
                sizeY: 10,
                realX: mouseDirection.offsetX,
                realY: mouseDirection.offsetY,
                dirX: mouseDirection.offsetX,
                dirY: mouseDirection.offsetY,
                deg: Math.atan2(mouseDirection.offsetX - (ctxWidth/2), -(mouseDirection.offsetY - (ctxHeight/2))),
                
                //Opportunity to restart the game
                destroyed: false
            };

            //Append a value to object and make the weapon to shoot
            bullets.push(weapon);
        } else {
            var dist;
            if(gameOver) {
                //Prevent double shoot
                dist = Math.sqrt(((mouseDirection.offsetX - ctxWidth/2) * (mouseDirection.offsetX - ctxWidth/2)) + ((mouseDirection.offsetY - (ctxHeight/2 + 45 + 22)) * (mouseDirection.offsetY - (ctxHeight/2+ 45 + 22))));
                
                if (dist < 27) {
                    if(mouseDirection.type == 'click') {
                        gameOver   = false;
                        count      = 0;
                        bullets    = [];
                        enemies  = [];
                        explosions = [];
                        destroyed  = 0;
                        player.deg = 0;
                        canvas.removeEventListener('contextmenu', action);
                        canvas.removeEventListener('mousemove', move);
                        canvas.style.cursor = "default";
                    } else {
                        canvas.style.cursor = "pointer";
                    }
                } else {
                    canvas.style.cursor = "default";
                }
            } else {
                dist = Math.sqrt(((mouseDirection.offsetX - ctxWidth/2) * (mouseDirection.offsetX - ctxWidth/2)) + ((mouseDirection.offsetY - ctxHeight/2) * (mouseDirection.offsetY - ctxHeight/2)));

                //Start button
                if (dist < 27) {
                    if(mouseDirection.type == 'click') {
                        playing = true;
                        canvas.removeEventListener('mousemove', action);
                        canvas.addEventListener('contextmenu', action);
                        canvas.addEventListener('mousemove', move);
                        canvas.setAttribute('class', 'playing');
                        canvas.style.cursor = 'default';
                    } else {
                        canvas.style.cursor = 'pointer';
                    }
                } else {
                    canvas.style.cursor = 'default';
                }
            }
        }
    }

    //Collision and battle function
    function fire() {
        var distance;
        
        for(var i = 0; i < bullets.length; i++) {
            if(!bullets[i].destroyed) {

                //Save the default state
                ctx.save();

                //Set the x and y value of starting and final position of shot
                ctx.translate(ctxWidth/2,ctxHeight/2);

                //Mouse controls shooting direction
                ctx.rotate(bullets[i].deg);

                //Draw necessary images and set coordinates
                ctx.drawImage(
                    sprite,
                    211,
                    100,
                    50,
                    75,
                    bullets[i].x,
                    bullets[i].y -= 20,
                    19,
                    30
                );

                //Restore the default state and allow to continue game after a collision
                ctx.restore();

                //Real coordinates and disappearance of a hit enemy
                bullets[i].realX = (0) - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
                bullets[i].realY = (0) + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

                bullets[i].realX += ctxWidth/2;
                bullets[i].realY += ctxHeight/2;

                //Collision cycle
                for(var j = 0; j < enemies.length; j++) {
                    if(!enemies[j].destroyed) {
                        //Only hit enemy disappears
                        distance = Math.sqrt(Math.pow(enemies[j].realX - bullets[i].realX, 2) + Math.pow(enemies[j].realY - bullets[i].realY, 2));

                        //Counter raising and forthcoming enemies
                        if (distance < (((enemies[j].width/enemies[j].size) / 2) - 4) + ((19 / 2) - 4)) {
                            destroyed += 1;
                            enemies[j].destroyed = true;
                            bullets[i].destroyed   = true;
                            explosions.push(enemies[j]);
                        }
                    }
                }
            }
        }
    }

    function country() {
        ctx.save();
        ctx.fillStyle   = 'white';
        ctx.shadowBlur    = 100;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor   = "#999";

        ctx.arc(
            (ctxWidth/2),
            (ctxHeight/2),
            100,
            0,
            Math.PI * 2
        );
        ctx.fill();

        //Country rotation
        ctx.translate(ctxWidth/2,ctxHeight/2);
        ctx.rotate((country.deg += 0.1) * (Math.PI / 180));
        ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200,200);
        ctx.restore();
    }
}