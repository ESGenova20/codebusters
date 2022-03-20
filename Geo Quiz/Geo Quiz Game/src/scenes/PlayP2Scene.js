import { CST } from "../CST.js";
export class PlayP2Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP2,
        });
    }
    preload(){
    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });    

    this.load.spritesheet("playerTwo","./assets/image/sprite/blueP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });  
    }
    
    create(){
        this.playerOne = this.add.sprite(200, 96, "playerOne", "./assets/image/sprite/greenP-L.png");
        this.playerTwo = this.add.sprite(500, 96, "playerTwo", "./assets/image/sprite/blueP-L.png");
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

        if (code == Phaser.Input.Keyboard.KeyCodes.A)
        {
            this.playerTwo.flipX = false;
            this.playerTwo.x -= (this.playerTwo.x < 24 ? 0: 4);
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.D)
        {
            this.playerTwo.flipX = true;
            this.playerTwo.x += (this.playerTwo.x > 700 ? 0 : 4);
        }

        if (code == Phaser.Input.Keyboard.KeyCodes.W)
        {
            this.playerTwo.y -= (this.playerTwo.y < 60 ? 0: 4);

        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.S)
        {
            this.playerTwo.y += (this.playerTwo.y > 500 ? 0: 4);
        }
     
    }

    update(){
       }
}