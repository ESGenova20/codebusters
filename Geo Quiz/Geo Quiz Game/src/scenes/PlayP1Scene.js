import { CST } from "../CST.js";
export class PlayP1Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP1,
        });
    }
    preload(){

    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });    
}
    
    create(){
        this.add.image(0,0, "playsceneBG").setOrigin(0);
        this.YES_button = this.add.image(210, 410, "YES_button");
        this.NO_button = this.add.image(590, 410, "NO_button");
        this.A_button = this.add.image(210,410,"A_button");
        this.B_button = this.add.image(590,410,"B_button");

        this.YES_button_S = this.add.image(210, 410, "YES_button_S");
        this.NO_button_S = this.add.image(590, 410, "NO_button_S");
        this.A_button_S = this.add.image(210, 410, "A_button_S");
        this.B_button_S = this.add.image(590, 410, "B_button_S");

        this.YES_button.setVisible(true);
        this.NO_button.setVisible(true);
        this.YES_button_S.setVisible(false);
        this.NO_button_S.setVisible(false);

        this.A_button.setVisible(false);
        this.B_button.setVisible(false);
        this.A_button_S.setVisible(false);
        this.B_button_S.setVisible(false);
        
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