import { CST } from "../CST.js";
export class PlayP1Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP1,
        });
    }
    preload(){

this.load.spritesheet("playerOne","./assets/image/sprite/playerone.png", 
{
    frameWidth: 96,
    frameHeight: 96
});    
this.load.atlas("playerOne", "./assets/image/sprite/playerone.png", "./assets/image/sprite/playerone_atlas.json");
    }
    
    create(){
        this.playerOne = this.add.sprite(96, 96, "playerOne", "./assets/image/sprite/playerone.png");
        this.input.keyboard.on('keydown', this.anyKey, this);
    }
    anyKey (event)
    {
        let code = event.keyCode;
        if (code == Phaser.Input.Keyboard.KeyCodes.LEFT)
        {
            this.playerOne.flipX = false;
            this.playerOne.x -= (this.playerOne.x < 24 ? 0: 4);
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.RIGHT)
        {
            this.playerOne.flipX = true;
            this.playerOne.x += (this.playerOne.x > 700 ? 0 : 4);
        }
    
        if (code == Phaser.Input.Keyboard.KeyCodes.UP)
        {
            this.playerOne.y -= (this.playerOne.y < 60 ? 0: 4);

        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.DOWN)
        {
            this.playerOne.y += (this.playerOne.y > 500 ? 0: 4);
        }
     
    }

    update(){
       }
}