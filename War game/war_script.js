window.addEventListener("DOMContentLoaded", game);

//General sprite load
var central = new Image();
var light = new Image();
var near = new Image();
var arsenal = new Image();
var blowup = new Image();
var startBtn = new Image();
var restartBtn = new Image();

//Links for images we use
central.src = 'https://cdn.discordapp.com/attachments/944900916451090473/954473738735345754/1200px-Flag_of_Germany-modified.png';
near.src = 'https://cdn-icons-png.flaticon.com/512/6551/6551200.png';
arsenal.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';
light.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';
startBtn.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';
restartBtn.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/sprite_bj90k9.png';

//Explosion onload function
window.onload = function() {
    blowup.src = 'https://res.cloudinary.com/dc4stsmlc/image/upload/v1570612478/Codepen/explosion_g9ncyg.png';
};

//Main function for war game
function game() {

    //Canvas height and width
    var canvas = document.getElementById('canvas'),
        ctx    = canvas.getContext('2d'),
        cH     = ctx.canvas.height = window.innerHeight,
        cW     = ctx.canvas.width  = window.innerWidth ;

    //Set values for necessary arrays and variables
    var bullets    = [],
        enemies  = [],
        explosions = [],
        destroyed  = 0,
        record     = 0,
        count      = 0,
        playing    = false,
        gameOver   = false,
        _planet    = {deg: 0};

    //Player's position, height and width
    var player = {
        posX   : -35,
        posY   : -(100+82),
        width  : 70,
        height : 70,
        deg    : 0
    };

    //Click and mousemove actions
    canvas.addEventListener('click', action);
    canvas.addEventListener('mousemove', action);

    //Update function
    function update() {
        cH = ctx.canvas.height = window.innerHeight;
        cW = ctx.canvas.width  = window.innerWidth ;
    }

    //Movement of mouse
    function move(mouse) {
        player.deg = Math.atan2(mouse.offsetX - (cW/2), -(mouse.offsetY - (cH/2)));
    }

    function action(mouse) {

        //Prevent unexpected actions and double shoot
        mouse.preventDefault();
        if(playing) {
            var bullet = {
                x: -8,
                y: -179,
                sizeX : 2,
                sizeY : 10,
                realX : mouse.offsetX,
                realY : mouse.offsetY,
                dirX  : mouse.offsetX,
                dirY  : mouse.offsetY,
                deg   : Math.atan2(mouse.offsetX - (cW/2), -(mouse.offsetY - (cH/2))),
                destroyed: false
            };

            //Append a value to bullet
            bullets.push(bullet);
        } else {
            var dist;
            if(gameOver) {

                //What happens when game over and change cursor style
                dist = Math.sqrt(((mouse.offsetX - cW/2) * (mouse.offsetX - cW/2)) + ((mouse.offsetY - (cH/2 + 45 + 22)) * (mouse.offsetY - (cH/2+ 45 + 22))));
                if (dist < 27) {
                    if(mouse.type == 'click') {
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
                dist = Math.sqrt(((mouse.offsetX - cW/2) * (mouse.offsetX - cW/2)) + ((mouse.offsetY - cH/2) * (mouse.offsetY - cH/2)));

                if (dist < 27) {
                    if(mouse.type == 'click') {
                        playing = true;
                        canvas.removeEventListener("mousemove", action);
                        canvas.addEventListener('contextmenu', action);
                        canvas.addEventListener('mousemove', move);
                        canvas.setAttribute("class", "playing");
                        canvas.style.cursor = "default";
                    } else {
                        canvas.style.cursor = "pointer";
                    }
                } else {
                    canvas.style.cursor = "default";
                }
            }
        }
    }

    //When there is a collision
    function fire() {
        var distance;

        for(var i = 0; i < bullets.length; i++) {
            if(!bullets[i].destroyed) {
                ctx.save();
                ctx.translate(cW/2,cH/2);
                ctx.rotate(bullets[i].deg);

                ///Draw necessary image and its position
                ctx.drawImage(
                    light,
                    211,
                    100,
                    50,
                    75,
                    bullets[i].x,
                    bullets[i].y -= 20,
                    19,
                    30
                );

                ctx.restore();

                bullets[i].realX = (0) - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
                bullets[i].realY = (0) + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

                bullets[i].realX += cW/2;
                bullets[i].realY += cH/2;

                //Collision cycle
                for(var j = 0; j < enemies.length; j++) {
                    if(!enemies[j].destroyed) {
                        distance = Math.sqrt(Math.pow(
                            enemies[j].realX - bullets[i].realX, 2) +
                            Math.pow(enemies[j].realY - bullets[i].realY, 2)
                        );

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

    //Country set up
    function germany() {
        ctx.save();
        ctx.fillStyle   = 'white';
        ctx.shadowBlur    = 100;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor   = "#999";

        ctx.arc((cW/2), (cH/2), 100, 0, Math.PI * 2);
        ctx.fill();

        //Rotation and drawing image
        ctx.translate(cW/2,cH/2);
        ctx.rotate((_planet.deg += 0.1) * (Math.PI / 180));
        ctx.drawImage(central, -100, -100, 200, 200);
        ctx.restore();
    }

    //Player function
    function _player() {
        ctx.save();
        ctx.translate(cW/2,cH/2);

        //Rotate regularly
        ctx.rotate(player.deg);
        ctx.drawImage(
            arsenal,
            200,
            0,
            player.width,
            player.height,
            player.posX,
            player.posY,
            player.width,
            player.height
        );

        ctx.restore();
        
        //Fire activation
        if(bullets.length - destroyed && playing) {
            fire();
        }
    }

    //Generate new enemy
    function newEnemy() {

        //Choose random position
        var type = random(1,4),
            coordsX,
            coordsY;

        switch(type){
            case 1:
                coordsX = random(0, cW);
                coordsY = 0 - 150;
                break;
            case 2:
                coordsX = cW + 150;
                coordsY = random(0, cH);
                break;
            case 3:
                coordsX = random(0, cW);
                coordsY = cH + 150;
                break;
            case 4:
                coordsX = 0 - 150;
                coordsY = random(0, cH);
                break;
        }

        //Enemy and its coordinates
        var enemy = {
            x: 278,
            y: 0,
            state: 0,
            stateX: 0,
            width: 100,
            height: 100,
            realX: coordsX,
            realY: coordsY,
            moveY: 0,
            coordsX: coordsX,
            coordsY: coordsY,
            size: random(1, 3),
            deg: Math.atan2(coordsX  - (cW/2), -(coordsY - (cH/2))),
            destroyed: false
        };
        enemies.push(enemy);
    }


    //Enemies' coming up function
    function _enemies() {
        var distance;

        for(var i = 0; i < enemies.length; i++) {
            if (!enemies[i].destroyed) {
                ctx.save();
                ctx.translate(enemies[i].coordsX, enemies[i].coordsY);
                ctx.rotate(enemies[i].deg);

                //Draw them and set their speed and coordinates
                ctx.drawImage(
                    near,
                    enemies[i].x,
                    enemies[i].y,
                    400,
                    750,
                    -(enemies[i].width / enemies[i].size) / 2,
                    enemies[i].moveY += 1/(enemies[i].size),
                    120,
                    150
                );

                ctx.restore();

                enemies[i].realX = (0) - (enemies[i].moveY + ((enemies[i].height / enemies[i].size)/2)) * Math.sin(enemies[i].deg);
                enemies[i].realY = (0) + (enemies[i].moveY + ((enemies[i].height / enemies[i].size)/2)) * Math.cos(enemies[i].deg);

                enemies[i].realX += enemies[i].coordsX;
                enemies[i].realY += enemies[i].coordsY;

                distance = Math.sqrt(Math.pow(enemies[i].realX -  cW/2, 2) + Math.pow(enemies[i].realY - cH/2, 2));
                if (distance < (((enemies[i].width/enemies[i].size) / 2) - 4) + 100) {
                    gameOver = true;
                    playing  = false;
                    canvas.addEventListener('mousemove', action);
                }
            } else if(!enemies[i].extinct) {
                explosion(enemies[i]);
            }
        }

        if(enemies.length - destroyed < 10 + (Math.floor(destroyed/6))) {
            newEnemy();
        }
    }

    //Explosion when there is a collision
    function explosion(enemy) {
        ctx.save();
        ctx.translate(enemy.realX, enemy.realY);
        ctx.rotate(enemy.deg);

        var spriteY,
            spriteX = 256;
        if(enemy.state == 0) {
            spriteY = 0;
            spriteX = 0;
        } else if (enemy.state < 8) {
            spriteY = 0;
        } else if(enemy.state < 16) {
            spriteY = 256;
        } else if(enemy.state < 24) {
            spriteY = 512;
        } else {
            spriteY = 768;
        }

        if(enemy.state == 8 || enemy.state == 16 || enemy.state == 24) {
            enemy.stateX = 0;
        }

        //Draw necassary image and set its coordinates
        ctx.drawImage(
            blowup,
            enemy.stateX += spriteX,
            spriteY,
            256,
            256,
            - (enemy.width / enemy.size)/2,
            -(enemy.height / enemy.size)/2,
            enemy.width / enemy.size,
            enemy.height / enemy.size
        );
        enemy.state += 1;

        if(enemy.state == 31) {
            enemy.extinct = true;
        }

        ctx.restore();
    }

    //Start function
    function start() {
        if(!gameOver) {

            ctx.clearRect(0, 0, cW, cH);
            ctx.beginPath();

            germany();

            _player();

            if(playing) {
                _enemies();

                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.textBaseline = 'middle';
                ctx.textAlign = "left";
                ctx.fillText('Record: '+record+'', 20, 30);

                ctx.font = "40px Verdana";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                ctx.strokeText(''+destroyed+'', cW/2,cH/2);
                ctx.fillText(''+destroyed+'', cW/2,cH/2);

            } else {
                //Draw start button
                ctx.drawImage(startBtn, 428, 12, 70, 70, cW/2 - 35, cH/2 - 35, 70,70);
            }
        } else if(count < 1) {

            //Game over display
            count = 1;
            ctx.fillStyle = 'rgba(0,0,0,0.85)';
            ctx.rect(0,0, cW,cH);
            ctx.fill();

            ctx.font = "60px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER",cW/2,cH/2 - 150);

            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Total destroyed: "+ destroyed, cW/2,cH/2 + 140);

            record = destroyed > record ? destroyed : record;

            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Record: "+ record, cW/2,cH/2 + 185);

            //Draw restart button
            ctx.drawImage(restartBtn, 500, 18, 70, 70, cW/2 - 35, cH/2 + 40, 70,70);

            canvas.removeAttribute('class');
        }
    }

    function init() {
        window.requestAnimationFrame(init);
        start();
    }

    init();

    function random(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }

    if(~window.location.href.indexOf('full')) {
        var full = document.getElementsByTagName('a');
        full[0].setAttribute('style', 'display: none');
    }
}